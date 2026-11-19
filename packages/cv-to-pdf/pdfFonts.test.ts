import { describe, expect, it } from 'bun:test'
import { deflateSync } from 'node:zlib'

import { listFonts } from './pdfFonts'

/** Objects laid out the way Chrome writes them: plain dictionaries, deflated streams. */
function pdf(objects: (string | { dict: string; stream: string })[]): Uint8Array {
  const parts = objects.map((object, index) => {
    const id = index + 1
    if (typeof object === 'string') return Buffer.from(`${id} 0 obj\n${object}\nendobj\n`, 'latin1')
    const data = deflateSync(Buffer.from(object.stream, 'latin1'))
    return Buffer.concat([
      Buffer.from(`${id} 0 obj\n<<${object.dict}\n/Length ${data.length}>> stream\n`, 'latin1'),
      data,
      Buffer.from('\nendstream\nendobj\n', 'latin1'),
    ])
  })
  return new Uint8Array(Buffer.concat([Buffer.from('%PDF-1.4\n'), ...parts]))
}

const toUnicode = (body: string) => ({ dict: '/Filter /FlateDecode', stream: body })

const sample = pdf([
  // 1: a composite font, as static Geist embeds
  '<</Type /Font\n/Subtype /Type0\n/BaseFont /AAAAAA+Geist-Bold\n/DescendantFonts [2 0 R]\n/ToUnicode 3 0 R>>',
  // 2: its descendant, which the parent already names
  '<</Type /Font\n/Subtype /CIDFontType2\n/BaseFont /AAAAAA+Geist-Bold>>',
  // 3
  toUnicode(
    '2 beginbfchar\n<0003> <0071>\n<0004> <2192>\nendbfchar\n1 beginbfrange\n<0005> <0007> <0430>\nendbfrange',
  ),
  // 4: a Type 3 font, named only by its descriptor
  '<</Type /Font\n/Subtype /Type3\n/FontDescriptor 5 0 R\n/ToUnicode 6 0 R>>',
  // 5
  '<</Type /FontDescriptor\n/FontName /BAAAAA+.SFNS-Regular_wdth_opsz_GRAD_wght2580000>>',
  // 6
  toUnicode('1 beginbfchar\n<0001> <0075>\nendbfchar'),
])

describe('listFonts', () => {
  const fonts = listFonts(sample)

  it('lists each font once, skipping composite descendants', () => {
    expect(fonts.map((font) => font.subtype)).toEqual(['Type0', 'Type3'])
  })

  it('drops the subset tag and falls back to the descriptor for a name', () => {
    expect(fonts.map((font) => font.name)).toEqual([
      'Geist-Bold',
      '.SFNS-Regular_wdth_opsz_GRAD_wght2580000',
    ])
  })

  it('reads the characters each font draws from its ToUnicode map', () => {
    expect(fonts.map((font) => font.chars)).toEqual(['qабв→', 'u'])
  })
})
