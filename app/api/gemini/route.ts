import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const apiKey =
      process.env.GOOGLE_GENAI_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY ||
      ''

    if (!apiKey || apiKey.trim().length === 0) {
      return NextResponse.json(
        { error: 'NO_API_KEY', message: 'Gemini API key is not configured on the server.' },
        { status: 503 }
      )
    }

    const genAI = new GoogleGenAI({ apiKey: apiKey.trim() })

    // Return streaming response via ReadableStream
    const responseStream = await genAI.models.generateContentStream({
      model: 'gemini-3.6-flash',
      contents: prompt,
    })

    const encoder = new TextEncoder()
    const customReadable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text))
            }
          }
          controller.close()
        } catch (streamErr) {
          console.error('Error during streaming generation:', streamErr)
          controller.error(streamErr)
        }
      },
    })

    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache, no-transform',
      },
    })
  } catch (error: any) {
    console.error('Gemini API Route Error:', error)
    return NextResponse.json(
      {
        error: 'API_ERROR',
        message: error?.message || 'Failed to communicate with Gemini API.',
      },
      { status: 500 }
    )
  }
}
