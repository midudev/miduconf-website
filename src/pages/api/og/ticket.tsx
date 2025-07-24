import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge'
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username') || 'Usuario'
    const ticketNumber = searchParams.get('ticketNumber') || '0'
    const fullname = searchParams.get('fullname') || username

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px'
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#fbbf24'
              }}
            >
              miduConf 2025
            </div>
          </div>

          {/* Ticket Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '2px solid #475569',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              width: '500px',
              height: '300px'
            }}
          >
            {/* User Info */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px'
                }}
              >
                {fullname}
              </div>
              <div
                style={{
                  fontSize: '18px',
                  color: '#94a3b8'
                }}
              >
                @{username}
              </div>
            </div>

            {/* Ticket Number */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#0f172a',
                borderRadius: '8px',
                padding: '12px 24px',
                border: '1px solid #334155'
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  color: '#64748b',
                  marginRight: '8px'
                }}
              >
                Ticket #
              </div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#fbbf24'
                }}
              >
                {ticketNumber}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              marginTop: '40px',
              fontSize: '16px',
              color: '#64748b'
            }}
          >
            ¡Te esperamos en la conferencia más importante del año!
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            color: 'white',
            fontSize: '24px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          Error generando imagen
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    )
  }
}