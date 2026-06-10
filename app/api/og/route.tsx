import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Aditya Bhatia';
    const type = searchParams.get('type') || 'portfolio';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#080808',
            padding: '80px',
            fontFamily: 'monospace',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#5e5e5e', fontSize: '20px' }}>adityabhatia.dev</span>
            <span style={{ color: '#e63946', fontSize: '20px', fontWeight: 'bold' }}>A</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {type === 'blog' && (
              <span style={{ color: '#e63946', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '16px' }}>
                blog post
              </span>
            )}
            <h1
              style={{
                fontSize: title.length > 30 ? '48px' : '64px',
                fontWeight: 'bold',
                color: '#efefef',
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: '-2px',
              }}
            >
              {title}
            </h1>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', paddingTop: '30px' }}>
            <span style={{ color: '#5e5e5e', fontSize: '18px' }}>researcher · founder · builder</span>
            <span style={{ color: '#5e5e5e', fontSize: '18px' }}>kanpur, india</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
