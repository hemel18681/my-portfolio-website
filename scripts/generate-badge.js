const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createBadge() {
  const width = 1500;
  const height = 1500;

  // 1. Process Asif's portrait (1.png): extract upper body (bust/torso) so head & chest are large and crisp
  // 1.png is 1280x2276. We extract from top=0 to height=1500 (approx 65% of height), then resize to width=540, height=660
  const portraitMetadata = await sharp('E:/portfolio-websites/1.png').metadata();
  const cropHeight = Math.floor(portraitMetadata.height * 0.65);

  const portrait = await sharp('E:/portfolio-websites/1.png')
    .extract({
      left: 0,
      top: 0,
      width: portraitMetadata.width,
      height: cropHeight,
    })
    .resize(540, 640, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Create SVG overlay with rich dark blue-purple styling
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0e1538" />
          <stop offset="35%" stop-color="#090d26" />
          <stop offset="100%" stop-color="#050716" />
        </linearGradient>

        <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#818cf8" />
          <stop offset="40%" stop-color="#6366f1" />
          <stop offset="80%" stop-color="#4338ca" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>

        <linearGradient id="pillBg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3730a3" />
          <stop offset="50%" stop-color="#4f46e5" />
          <stop offset="100%" stop-color="#4338ca" />
        </linearGradient>

        <radialGradient id="avatarGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.5" />
          <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#090d26" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Main Canvas Background -->
      <rect width="1500" height="1500" fill="#040612" />

      <!-- ================= LEFT CARD: FRONT ================= -->
      <rect x="25" y="35" width="690" height="1050" rx="55" fill="url(#cardBg)" stroke="url(#borderGlow)" stroke-width="12" />

      <!-- Card Top Slot -->
      <rect x="290" y="45" width="160" height="16" rx="8" fill="#040612" stroke="#4338ca" stroke-width="3" />

      <!-- Subtle Tech Circuit Lines on Front -->
      <g opacity="0.08" stroke="#818cf8" stroke-width="1.5">
        <line x1="60" y1="120" x2="680" y2="120" />
        <line x1="60" y1="220" x2="680" y2="220" />
        <line x1="60" y1="320" x2="680" y2="320" />
        <line x1="60" y1="420" x2="680" y2="420" />
        <line x1="60" y1="520" x2="680" y2="520" />
        <line x1="60" y1="620" x2="680" y2="620" />
      </g>

      <!-- Glow Behind Photo -->
      <circle cx="370" cy="380" r="260" fill="url(#avatarGlow)" />

      <!-- Front Header Branding -->
      <text x="75" y="105" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="900" fill="#ffffff" letter-spacing="2">ASIF HEMEL</text>
      <circle cx="655" cy="98" r="8" fill="#34d399" />
      <text x="635" y="105" font-family="Courier New, monospace" font-size="16" font-weight="bold" fill="#34d399" text-anchor="end">LIVE</text>

      <!-- Bottom Pill: Senior Software Engineer Title -->
      <rect x="65" y="750" width="610" height="100" rx="28" fill="url(#pillBg)" stroke="#818cf8" stroke-width="3" />
      <text x="370" y="815" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">SENIOR SOFTWARE ENGINEER</text>

      <!-- Subtitle & Specialization -->
      <text x="370" y="905" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="3">FULL-STACK &amp; ARCHITECT</text>
      <text x="370" y="960" font-family="Courier New, monospace" font-size="20" font-weight="bold" fill="#818cf8" text-anchor="middle" letter-spacing="3">ENTERPRISE CLOUD • DISTRIBUTED</text>

      <!-- Security Barcode Lines at Bottom of Front -->
      <g opacity="0.8" fill="#818cf8">
        <rect x="80" y="1000" width="6" height="34" />
        <rect x="92" y="1000" width="12" height="34" />
        <rect x="110" y="1000" width="4" height="34" />
        <rect x="120" y="1000" width="16" height="34" />
        <rect x="142" y="1000" width="8" height="34" />
        <rect x="156" y="1000" width="4" height="34" />
        <rect x="166" y="1000" width="14" height="34" />
        <rect x="186" y="1000" width="6" height="34" />
        <rect x="198" y="1000" width="10" height="34" />
        <rect x="214" y="1000" width="4" height="34" />
        <rect x="224" y="1000" width="16" height="34" />
        <rect x="246" y="1000" width="8" height="34" />

        <text x="660" y="1025" font-family="Courier New, monospace" font-size="18" font-weight="bold" fill="#a5b4fc" text-anchor="end">DEV-ID: #18103112</text>
      </g>

      <!-- ================= RIGHT CARD: BACK ================= -->
      <rect x="785" y="35" width="690" height="1050" rx="55" fill="url(#cardBg)" stroke="url(#borderGlow)" stroke-width="12" />

      <!-- Top Slot on Back -->
      <rect x="1050" y="45" width="160" height="16" rx="8" fill="#040612" stroke="#4338ca" stroke-width="3" />

      <!-- Back Title -->
      <text x="1130" y="135" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">ASIF UDDIN AHMED HEMEL</text>
      <text x="1130" y="175" font-family="Courier New, monospace" font-size="20" font-weight="bold" fill="#818cf8" text-anchor="middle" letter-spacing="3">SENIOR SOFTWARE ENGINEER</text>

      <!-- Center Divider -->
      <line x1="840" y1="210" x2="1420" y2="210" stroke="#4338ca" stroke-width="2" stroke-dasharray="8 8" />

      <!-- Core Tech Badges on Back -->
      <!-- Row 1 -->
      <g transform="translate(840, 240)">
        <rect width="175" height="75" rx="16" fill="#171e47" stroke="#6366f1" stroke-width="2" />
        <text x="87" y="46" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#61dafb" text-anchor="middle">⚛ React</text>
      </g>
      <g transform="translate(1042, 240)">
        <rect width="175" height="75" rx="16" fill="#171e47" stroke="#6366f1" stroke-width="2" />
        <text x="87" y="46" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">▲ Next.js</text>
      </g>
      <g transform="translate(1245, 240)">
        <rect width="175" height="75" rx="16" fill="#171e47" stroke="#6366f1" stroke-width="2" />
        <text x="87" y="46" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">📘 TypeScript</text>
      </g>

      <!-- Row 2 -->
      <g transform="translate(840, 335)">
        <rect width="175" height="75" rx="16" fill="#171e47" stroke="#6366f1" stroke-width="2" />
        <text x="87" y="46" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#f87171" text-anchor="middle">🅰 Angular</text>
      </g>
      <g transform="translate(1042, 335)">
        <rect width="175" height="75" rx="16" fill="#171e47" stroke="#6366f1" stroke-width="2" />
        <text x="87" y="46" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#c084fc" text-anchor="middle">🟣 .NET Core</text>
      </g>
      <g transform="translate(1245, 335)">
        <rect width="175" height="75" rx="16" fill="#171e47" stroke="#6366f1" stroke-width="2" />
        <text x="87" y="46" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#4ade80" text-anchor="middle">🟢 Node.js</text>
      </g>

      <!-- Row 3 -->
      <g transform="translate(840, 430)">
        <rect width="175" height="75" rx="16" fill="#171e47" stroke="#6366f1" stroke-width="2" />
        <text x="87" y="46" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#fbbf24" text-anchor="middle">☁ AWS Cloud</text>
      </g>
      <g transform="translate(1042, 430)">
        <rect width="175" height="75" rx="16" fill="#171e47" stroke="#6366f1" stroke-width="2" />
        <text x="87" y="46" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#60a5fa" text-anchor="middle">🐳 Docker</text>
      </g>
      <g transform="translate(1245, 430)">
        <rect width="175" height="75" rx="16" fill="#171e47" stroke="#6366f1" stroke-width="2" />
        <text x="87" y="46" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">🐘 PostgreSQL</text>
      </g>

      <!-- Highlights Section -->
      <rect x="840" y="535" width="580" height="230" rx="22" fill="#0a0e2a" stroke="#3730a3" stroke-width="2" />
      <text x="870" y="585" font-family="Courier New, monospace" font-size="19" font-weight="bold" fill="#c7d2fe">✦ 4.5+ YRS ENTERPRISE SYSTEMS EXP</text>
      <text x="870" y="635" font-family="Courier New, monospace" font-size="19" font-weight="bold" fill="#c7d2fe">✦ 300+ BANK BRANCHES MODERNIZED</text>
      <text x="870" y="685" font-family="Courier New, monospace" font-size="19" font-weight="bold" fill="#c7d2fe">✦ FCV JAPAN DEEP LEARNING RESEARCH</text>
      <text x="870" y="735" font-family="Courier New, monospace" font-size="19" font-weight="bold" fill="#c7d2fe">✦ IUBAT ICPC / NCPC PROGRAMMING</text>

      <!-- Bottom Card Back Info -->
      <g transform="translate(840, 795)">
        <rect width="580" height="235" rx="22" fill="#111740" stroke="#4338ca" stroke-width="2" />
        <text x="35" y="45" font-family="Courier New, monospace" font-size="16" font-weight="bold" fill="#818cf8">ISSUED CREDENTIALS:</text>
        <text x="35" y="85" font-family="Arial, sans-serif" font-size="26" font-weight="900" fill="#ffffff">ASIF UDDIN AHMED HEMEL</text>
        <text x="35" y="125" font-family="Courier New, monospace" font-size="18" font-weight="bold" fill="#34d399">ROLE: SENIOR SOFTWARE ENGINEER</text>
        <text x="35" y="160" font-family="Courier New, monospace" font-size="16" fill="#a5b4fc">SECURITY CLEARANCE: LEVEL 5 (SYS-ARCH)</text>
        <text x="35" y="195" font-family="Courier New, monospace" font-size="14" fill="#64748b">HTTPS://HEMEL18681.NETLIFY.APP</text>
      </g>
    </svg>
  `);

  // Composite SVG background, Asif's portrait (positioned nicely between y=120 and y=740), and output
  await sharp(svgOverlay)
    .composite([
      {
        input: portrait,
        top: 115,
        left: 100,
        blend: 'over',
      },
    ])
    .png()
    .toFile('E:/portfolio-websites/my-portfolio-website/public/assets/images/custom_card_texture.png');

  console.log('Successfully regenerated custom_card_texture.png');
}

createBadge().catch(console.error);
