import QRCode from 'qrcode';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BRAND_ACCENT = '#1C5BFF';
const BRAND_DARK = '#0A0C10';
const BRAND_LIGHT = '#F5F5F7';

const URL = 'https://xs-parking.com/#/download';
const OUTPUT_DIR = path.join(__dirname, 'public');

async function generateLogo(size) {
  const logoSize = Math.floor(size * 0.25);
  const padding = Math.floor(logoSize * 0.15);
  const totalSize = logoSize + padding * 2;
  const cornerRadius = Math.floor(totalSize * 0.2);
  
  const svg = `
    <svg width="${totalSize}" height="${totalSize}" viewBox="0 0 ${totalSize} ${totalSize}">
      <defs>
        <clipPath id="roundedRect">
          <rect x="0" y="0" width="${totalSize}" height="${totalSize}" rx="${cornerRadius}" ry="${cornerRadius}"/>
        </clipPath>
      </defs>
      <rect x="0" y="0" width="${totalSize}" height="${totalSize}" rx="${cornerRadius}" ry="${cornerRadius}" fill="white"/>
      <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" 
            font-family="Arial, sans-serif" font-size="${logoSize * 0.6}" font-weight="800" font-style="italic" fill="${BRAND_ACCENT}">
        Xs
      </text>
    </svg>
  `;
  
  return sharp(Buffer.from(svg))
    .resize(totalSize, totalSize)
    .png()
    .toBuffer();
}

async function generateQRCode() {
  const size = 1024;
  
  const qrBuffer = await QRCode.toBuffer(URL, {
    width: size,
    margin: 2,
    color: {
      dark: BRAND_DARK,
      light: BRAND_LIGHT,
    },
    errorCorrectionLevel: 'H',
  });
  
  const logoBuffer = await generateLogo(size);
  
  const qrImage = sharp(qrBuffer);
  const logoImage = sharp(logoBuffer);
  const logoMetadata = await logoImage.metadata();
  
  const logoX = Math.floor((size - logoMetadata.width) / 2);
  const logoY = Math.floor((size - logoMetadata.height) / 2);
  
  const finalImage = await qrImage
    .composite([{
      input: logoBuffer,
      top: logoY,
      left: logoX,
    }])
    .png()
    .toBuffer();
  
  await sharp(finalImage)
    .png()
    .toFile(path.join(OUTPUT_DIR, 'qr-code.png'));
  
  const svgQR = await QRCode.toString(URL, {
    type: 'svg',
    width: size,
    margin: 2,
    color: {
      dark: BRAND_DARK,
      light: BRAND_LIGHT,
    },
    errorCorrectionLevel: 'H',
  });
  
  const logoSizeForSvg = Math.floor(size * 0.25);
  const paddingForSvg = Math.floor(logoSizeForSvg * 0.15);
  const totalLogoSize = logoSizeForSvg + paddingForSvg * 2;
  const cornerRadiusForSvg = Math.floor(totalLogoSize * 0.2);
  const logoXForSvg = (size - totalLogoSize) / 2;
  const logoYForSvg = (size - totalLogoSize) / 2;
  
  const logoSvg = `
    <g transform="translate(${logoXForSvg}, ${logoYForSvg})">
      <rect x="0" y="0" width="${totalLogoSize}" height="${totalLogoSize}" rx="${cornerRadiusForSvg}" ry="${cornerRadiusForSvg}" fill="white"/>
      <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" 
            font-family="Arial, sans-serif" font-size="${logoSizeForSvg * 0.6}" font-weight="800" font-style="italic" fill="${BRAND_ACCENT}">
        Xs
      </text>
    </g>
  `;
  
  const finalSvg = svgQR.replace('</svg>', `${logoSvg}</svg>`);
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'qr-code.svg'), finalSvg);
  
  console.log('Generated QR codes:');
  console.log(`  - ${path.join(OUTPUT_DIR, 'qr-code.png')}`);
  console.log(`  - ${path.join(OUTPUT_DIR, 'qr-code.svg')}`);
}

generateQRCode().catch(console.error);
