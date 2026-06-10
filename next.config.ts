import type { NextConfig } from 'next';
import fs from 'fs';
import path from 'path';

// Automated copy of the generated Dr. Doom illustration
const sourcePath = 'C:\\Users\\asus\\.gemini\\antigravity\\brain\\c5aaf149-0a34-4c72-9495-6d19a94f2ad7\\dr_doom_portrait_1781086442183.png';
const destDir = path.join(process.cwd(), 'public');
const destPath = path.join(destDir, 'dr_doom.png');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log('Successfully copied Dr. Doom asset to public/dr_doom.png');
  } else {
    console.log('Source Dr. Doom asset not found at:', sourcePath);
  }
} catch (err) {
  console.error('Failed to copy Dr. Doom asset:', err);
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github-readme-stats.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'streak-stats.demolab.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://github-readme-stats.vercel.app https://streak-stats.demolab.com; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none'; object-src 'none';",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
