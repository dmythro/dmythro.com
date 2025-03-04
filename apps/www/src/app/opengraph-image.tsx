import fs from 'node:fs'
import path from 'node:path'
import { ImageResponse } from 'next/og'

import { USERNAME } from 'my-constants'
import { SOCIAL_LINKS, SOCIAL_LINKS_WORK } from 'src/constants'

const links = [...SOCIAL_LINKS_WORK, ...SOCIAL_LINKS]

export const alt = '@Dmythro'
export const size = {
  width: 1200,
  height: 630,
}

const fontSize = 42
const socialIconSize = 28

// TODO: it doesn't work at all, renders PNG anyways:
// export const contentType = 'image/jpeg'
export const contentType = 'image/png'
// export const contentType = 'image/webp'

// TODO: edge runtime can load image with full absolute URL with fetch, but it feels odd:
// export const runtime = 'edge'

const imagePath = path.resolve('public/avatar@400px.jpg')
const imageBuffer = fs.readFileSync(imagePath)
const imageBase64 = imageBuffer.toString('base64')
const imageSrc = `data:image/jpeg;base64,${imageBase64}`

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: '#222',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          // background: '#000',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 0,
          flexShrink: 1,
          fontSize,
          gap: 24,
          justifyContent: 'center',
          padding: 42,
        }}
      >
        <div
          style={{
            border: '5px solid white',
            borderRadius: '50%',
            display: 'flex',
            height: 400,
            overflow: 'hidden',
            width: 400,
          }}
        >
          {/* biome-ignore lint/nursery/noImgElement: */}
          <img
            src={imageSrc}
            alt="Avatar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        <div style={{ background: '#222', display: 'flex' }}>
          <span style={{ color: '#666', marginLeft: -21 }}>@</span>
          <span>{USERNAME.replace('@', '')}</span>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {links.map(({ Icon, href }) => (
            <Icon key={href} fill="#666" height={socialIconSize} />
          ))}
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
