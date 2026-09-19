import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Construct the high-fidelity SVG of "Nuevo Logo 2026 - Transparente"
// Features:
// - Double glowing cyan neon circles
// - "Colshopi" in flowing 3D cyan script with glossy white reflections and dark dropshadow
// - Horizontal cyan divider lines with "Tienda" in bold modern white caps
// - "By Leps Digital" in cursive script with "By" in white and "Leps Digital" in electric cyan
const createLogoSvg = (size = 512, withBackground = false) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Pacifico&amp;family=Montserrat:wght@800;900&amp;family=Caveat:wght@700&amp;display=swap');
      .colshopi-text {
        font-family: 'Pacifico', 'Brush Script MT', 'Dancing Script', cursive, sans-serif;
        font-size: 96px;
        font-weight: 400;
      }
      .tienda-text {
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 36px;
        font-weight: 900;
        letter-spacing: 12px;
      }
      .leps-text {
        font-family: 'Caveat', 'Dancing Script', 'Brush Script MT', cursive, sans-serif;
        font-size: 54px;
        font-weight: 700;
      }
    </style>

    <!-- Cyan Glow Filter -->
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="subtleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <filter id="textDepth" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="5" stdDeviation="2" flood-color="#002b36" flood-opacity="0.9"/>
      <feDropShadow dx="-1" dy="-1" stdDeviation="1" flood-color="#7df9ff" flood-opacity="0.5"/>
    </filter>

    <!-- Radial & Linear Gradients -->
    <radialGradient id="badgeBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#071822" stop-opacity="${withBackground ? '0.98' : '0'}"/>
      <stop offset="70%" stop-color="#05121b" stop-opacity="${withBackground ? '0.99' : '0'}"/>
      <stop offset="100%" stop-color="#020a10" stop-opacity="${withBackground ? '1' : '0'}"/>
    </radialGradient>

    <linearGradient id="cyanNeon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#26F0F1"/>
      <stop offset="50%" stop-color="#00E5FF"/>
      <stop offset="100%" stop-color="#00B4D8"/>
    </linearGradient>

    <linearGradient id="textCyanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E0FFFF"/>
      <stop offset="30%" stop-color="#38E1FF"/>
      <stop offset="70%" stop-color="#00D2F7"/>
      <stop offset="100%" stop-color="#0099B8"/>
    </linearGradient>

    <linearGradient id="tiendaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
  </defs>

  ${withBackground ? `<circle cx="256" cy="256" r="252" fill="url(#badgeBg)"/>` : ''}

  <!-- Double Circular Glowing Neon Rings -->
  <!-- Outer Ring -->
  <circle
    cx="256"
    cy="256"
    r="230"
    fill="none"
    stroke="url(#cyanNeon)"
    stroke-width="9"
    filter="url(#neonGlow)"
  />

  <!-- Inner Ring with small offset -->
  <circle
    cx="256"
    cy="256"
    r="215"
    fill="none"
    stroke="#00E5FF"
    stroke-width="3"
    opacity="0.9"
  />

  <!-- Top "Colshopi" Text with 3D layers -->
  <g filter="url(#textDepth)">
    <!-- Outline shadow for legibility -->
    <text
      x="256"
      y="226"
      text-anchor="middle"
      class="colshopi-text"
      fill="#003544"
      stroke="#00222e"
      stroke-width="12"
      stroke-linejoin="round"
    >Colshopi</text>

    <!-- Main Vibrant Body -->
    <text
      x="256"
      y="226"
      text-anchor="middle"
      class="colshopi-text"
      fill="url(#textCyanGrad)"
      stroke="#005B73"
      stroke-width="2.5"
    >Colshopi</text>

    <!-- Highlight stroke overlay -->
    <text
      x="255"
      y="224"
      text-anchor="middle"
      class="colshopi-text"
      fill="none"
      stroke="#FFFFFF"
      stroke-width="1"
      opacity="0.65"
    >Colshopi</text>
  </g>

  <!-- Middle Divider: Left line, "Tienda", Right line -->
  <g filter="url(#subtleShadow)">
    <line
      x1="70"
      y1="284"
      x2="160"
      y2="284"
      stroke="url(#cyanNeon)"
      stroke-width="7"
      stroke-linecap="round"
      filter="url(#neonGlow)"
    />

    <!-- "Tienda" in Bold Sans-Serif with black shadow -->
    <text
      x="263"
      y="297"
      text-anchor="middle"
      class="tienda-text"
      fill="#0F172A"
      stroke="#0F172A"
      stroke-width="4"
    >TIENDA</text>
    <text
      x="263"
      y="297"
      text-anchor="middle"
      class="tienda-text"
      fill="url(#tiendaGrad)"
    >TIENDA</text>

    <line
      x1="365"
      y1="284"
      x2="455"
      y2="284"
      stroke="url(#cyanNeon)"
      stroke-width="7"
      stroke-linecap="round"
      filter="url(#neonGlow)"
    />
  </g>

  <!-- Bottom: "By Leps Digital" in Calligraphy Script -->
  <g filter="url(#subtleShadow)">
    <!-- Shadow layer -->
    <text
      x="256"
      y="370"
      text-anchor="middle"
      class="leps-text"
      fill="#001F29"
      stroke="#001F29"
      stroke-width="7"
      stroke-linejoin="round"
    >
      <tspan fill="#001F29">By </tspan>
      <tspan fill="#001F29">Leps Digital</tspan>
    </text>

    <!-- Front layer -->
    <text
      x="256"
      y="370"
      text-anchor="middle"
      class="leps-text"
    >
      <tspan fill="#FFFFFF" font-style="italic">By </tspan>
      <tspan fill="url(#cyanNeon)">Leps Digital</tspan>
    </text>
  </g>
</svg>
`;

async function generateAll() {
  console.log('Generating ColShopi Tienda Logo Assets...');
  const publicDir = path.resolve('public');
  const distDir = path.resolve('dist');

  // 1. Generate icon.svg with transparent background
  const transparentSvg = createLogoSvg(512, false);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), transparentSvg);

  // 2. Generate maskable / mobile app icon with clean dark circular contrast background (#05121b)
  // so on mobile/tablet/desktop launchers the icon is crisp, vivid and meets Android maskable safe zones
  const appIconSvg = createLogoSvg(512, true);
  fs.writeFileSync(path.join(publicDir, 'icon-badge.svg'), appIconSvg);

  // 3. Render 512x512 PNG
  const buf512 = await sharp(Buffer.from(appIconSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), buf512);

  // 4. Render 192x192 PNG
  const buf192 = await sharp(Buffer.from(appIconSvg))
    .resize(192, 192)
    .png({ quality: 100 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), buf192);

  // 5. Render 180x180 Apple Touch Icon (iOS Safari)
  const buf180 = await sharp(Buffer.from(appIconSvg))
    .resize(180, 180)
    .png({ quality: 100 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), buf180);

  // 6. Transparent logo PNG for in-app display (download modal, header, etc.)
  const bufLogoTrans = await sharp(Buffer.from(transparentSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'colshopi-logo.png'), bufLogoTrans);
  fs.writeFileSync(path.join(publicDir, 'Nuevo Logo 2026 - Transparente.png'), bufLogoTrans);

  // 7. Favicon PNG (48x48) & Favicon.ico
  const bufFavicon = await sharp(Buffer.from(appIconSvg))
    .resize(48, 48)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), bufFavicon);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), bufFavicon);

  // Also copy to dist if dist exists
  if (fs.existsSync(distDir)) {
    fs.copyFileSync(path.join(publicDir, 'icon-512.png'), path.join(distDir, 'icon-512.png'));
    fs.copyFileSync(path.join(publicDir, 'icon-192.png'), path.join(distDir, 'icon-192.png'));
    fs.copyFileSync(path.join(publicDir, 'apple-touch-icon.png'), path.join(distDir, 'apple-touch-icon.png'));
    fs.copyFileSync(path.join(publicDir, 'colshopi-logo.png'), path.join(distDir, 'colshopi-logo.png'));
    fs.copyFileSync(path.join(publicDir, 'Nuevo Logo 2026 - Transparente.png'), path.join(distDir, 'Nuevo Logo 2026 - Transparente.png'));
    fs.copyFileSync(path.join(publicDir, 'icon.svg'), path.join(distDir, 'icon.svg'));
    fs.copyFileSync(path.join(publicDir, 'favicon.ico'), path.join(distDir, 'favicon.ico'));
    fs.copyFileSync(path.join(publicDir, 'favicon.png'), path.join(distDir, 'favicon.png'));
  }

  console.log('All icons generated successfully!');
}

generateAll().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
