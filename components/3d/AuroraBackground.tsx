'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

/**
 * WebGL Aurora Borealis shader background.
 * Uses raw Three.js for minimal bundle — no R3F needed for a fullscreen quad.
 * Rendered on a <canvas> with an IntersectionObserver to pause when off-screen.
 */
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // Vertex shader — fullscreen quad
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `

    // Fragment shader — simplex noise aurora
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;

      // Simplex noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        float t = uTime * 0.15;

        // Aurora colors — Deep obsidian / dark cyber indigo / slate (matches dark theme)
        vec3 color1 = vec3(0.10, 0.14, 0.20);   // Deep cyber slate
        vec3 color2 = vec3(0.06, 0.09, 0.14);   // Deep indigo void
        vec3 color3 = vec3(0.04, 0.06, 0.09);   // Pure obsidian
        vec3 bg = vec3(0.059, 0.067, 0.082);     // #0f1115 Obsidian Dark

        float n1 = snoise(vec2(uv.x * 2.0 + t, uv.y * 1.5 + t * 0.5)) * 0.5 + 0.5;
        float n2 = snoise(vec2(uv.x * 3.0 - t * 0.7, uv.y * 2.0 + t * 0.3)) * 0.5 + 0.5;
        float n3 = snoise(vec2(uv.x * 1.5 + t * 0.4, uv.y * 3.0 - t * 0.6)) * 0.5 + 0.5;

        // Subtle ambient wave in upper portion
        float band = smoothstep(0.10, 0.40, uv.y) * smoothstep(0.95, 0.50, uv.y);
        float wave = sin(uv.x * 3.0 + t * 1.5 + n1 * 1.5) * 0.10;
        band *= smoothstep(0.0, 0.20, uv.y + wave);

        vec3 aurora = mix(color1, color2, n1);
        aurora = mix(aurora, color3, n2 * 0.5);
        aurora *= band * (0.15 + n3 * 0.25);

        // Ultra-subtle ambient blend with obsidian background
        vec3 final = mix(bg, aurora, 0.15);

        gl_FragColor = vec4(final, 1.0);
      }
    `

    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(animate)
        return
      }
      uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animate()

    // Resize handler
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      uniforms.uResolution.value.set(w, h)
    }
    window.addEventListener('resize', resize)

    // IntersectionObserver for performance
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      observer.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [isVisible])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  )
}
