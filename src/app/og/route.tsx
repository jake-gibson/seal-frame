import { ImageResponse } from 'next/og';
import { Inter, Roboto, Rubik } from 'next/font/google';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : '';

    // ?total=...
    const hasTotal = searchParams.has('total');
    const total = searchParams.get('total');
    const yes = searchParams.get('yes');
    const no = searchParams.get('no');
    const yesPercent = Number(yes) / Number(total);
    const noPercent = Number(no) / Number(total);

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor: 'rgb(71, 85, 105)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              borderBottom: '1px dashed white',
              backgroundColor: 'rgb(34, 197, 94)',
              height: '20%',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}
          >
            <p
              style={{
                color: 'white',
                fontStyle: 'italic',
                fontFamily: 'roboto',
                fontSize: 40,
                fontWeight: 900,
                marginLeft: '5%',
              }}
            >
              Daily Question
            </p>
            <div
              style={{
                height: '12vh',
                width: '12vh',
                backgroundColor: 'white',
                marginRight: '5%',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 65,
              }}
            >
              🌎
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: '5%',
              paddingRight: '5%',
              height: '80%',
              justifyContent: `${hasTotal ? 'center' : 'center'}`,
              width: '100%',
              alignItems: 'center',
              boxSizing: 'border-box',
              backgroundSize: '40px 40px',
              backgroundImage:
                'linear-gradient(to right, rgb(90, 104, 125) 1px, transparent 1px), linear-gradient(to bottom, rgb(90, 104, 125) 1px, transparent 1px)',
            }}
          >
            <p
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
                backgroundClip: 'text',
                color: 'transparent',
                fontSize: `${hasTotal ? '60' : '80'}`,
                fontWeight: 700,
                marginBottom: '5%',
              }}
            >
              {title}
            </p>
            {hasTotal && (
              <div
                style={{
                  height: '25%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, rgb(25, 194, 36), rgb(125, 201, 75))',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontSize: 50,
                    fontWeight: 900,
                    margin: 0,
                  }}
                >
                  {`Yes (${yes})`}
                </p>
                <div
                  style={{
                    height: '100%',
                    width: '60%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '3%',
                    border: '2px solid white',
                    borderRadius: '30px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.round(yesPercent * 100)}%`,
                      backgroundImage:
                        'linear-gradient(90deg, rgb(25, 194, 36), rgb(125, 201, 75))',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      fontSize: 30,
                    }}
                  >
                    {`${
                      yesPercent !== 0
                        ? yesPercent === 1
                          ? '100%'
                          : yesPercent.toFixed(2).slice(2) + '%'
                        : ''
                    }`}
                  </div>
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.round(noPercent * 100)}%`,
                      backgroundImage:
                        'linear-gradient(90deg, rgb(255, 0, 128), rgb(191, 19, 74))',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      fontSize: 30,
                    }}
                  >{`${
                    noPercent !== 0
                      ? noPercent === 1
                        ? '100%'
                        : noPercent.toFixed(2).slice(2) + '%'
                      : ''
                  }`}</div>
                </div>
                <p
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, rgb(191, 19, 74), rgb(255, 0, 128))',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontSize: 50,
                    fontWeight: 900,
                    margin: 0,
                  }}
                >
                  {`No (${no})`}
                </p>
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
