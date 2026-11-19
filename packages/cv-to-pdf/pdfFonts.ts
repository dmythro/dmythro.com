import { inflateSync } from 'node:zlib'

export interface PdfFont {
  /** PostScript name with the subset tag dropped: `Geist-Bold`, not `AAAAAA+Geist-Bold`. */
  name: string
  /** `Type0`, `TrueType`, `Type3`… Type 3 stores each glyph as a drawing. */
  subtype: string
  /** The characters this font draws, read from its ToUnicode map. */
  chars: string
}

const nameToken = String.raw`\/([^\s/<>\[\]()]+)`

/**
 * Chrome writes every object as plain `N 0 obj <<…>>`, with no object streams, so
 * font dictionaries can be read straight out of the bytes with no PDF parser.
 */
function readObjects(text: string): Map<string, { dict: string; streamStart?: number }> {
  const objects = new Map<string, { dict: string; streamStart?: number }>()
  for (const match of text.matchAll(/(\d+) 0 obj\s*(<<[\s\S]*?>>)\s*(stream\r?\n|endobj)/g)) {
    const [whole, id, dict, end] = match
    const streamStart = end.startsWith('stream') ? match.index + whole.length : undefined
    objects.set(id, { dict, streamStart })
  }
  return objects
}

function ref(dict: string, key: string): string | undefined {
  return dict.match(new RegExp(String.raw`\/${key}\s+(\d+)\s+0\s+R`))?.[1]
}

function hexToText(hex: string): string {
  const units = hex.match(/[0-9a-f]{4}/gi)?.map((unit) => Number.parseInt(unit, 16)) ?? []
  return String.fromCharCode(...units)
}

/** Every destination string in a ToUnicode CMap: single mappings and ranges alike. */
function cmapChars(cmap: string): string {
  const chars = new Set<string>()
  for (const [, block] of cmap.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
    for (const [, dst] of block.matchAll(/<[0-9a-f]+>\s*<([0-9a-f]+)>/gi)) chars.add(hexToText(dst))
  }
  for (const [, block] of cmap.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)) {
    for (const [, lo, hi, dst] of block.matchAll(
      /<([0-9a-f]+)>\s*<([0-9a-f]+)>\s*<([0-9a-f]+)>/gi,
    )) {
      const first = hexToText(dst).codePointAt(0) ?? 0
      const count = Number.parseInt(hi, 16) - Number.parseInt(lo, 16)
      for (let i = 0; i <= count; i++) chars.add(String.fromCodePoint(first + i))
    }
  }
  return [...chars].sort().join('')
}

/** Lists the fonts a PDF printed with, named the way the PDF names them. */
export function listFonts(pdf: Uint8Array): PdfFont[] {
  const text = new TextDecoder('latin1').decode(pdf)
  const objects = readObjects(text)

  const toUnicode = (dict: string): string => {
    const stream = objects.get(ref(dict, 'ToUnicode') ?? '')
    const length = Number(stream?.dict.match(/\/Length\s+(\d+)(?!\s+0\s+R)/)?.[1])
    if (stream?.streamStart === undefined || !length) return ''
    const data = pdf.subarray(stream.streamStart, stream.streamStart + length)
    const flate = /\/Filter\s*\/FlateDecode/.test(stream.dict)
    return cmapChars(new TextDecoder('latin1').decode(flate ? inflateSync(data) : data))
  }

  const fonts: PdfFont[] = []
  for (const { dict } of objects.values()) {
    if (!/\/Type\s*\/Font\b/.test(dict)) continue
    const subtype = dict.match(new RegExp(String.raw`\/Subtype\s*${nameToken}`))?.[1] ?? ''
    // A composite font's descendant is named by its parent `Type0` already.
    if (subtype.startsWith('CIDFontType')) continue

    const descriptor = objects.get(ref(dict, 'FontDescriptor') ?? '')?.dict ?? ''
    const name =
      dict.match(new RegExp(String.raw`\/BaseFont\s*${nameToken}`))?.[1] ??
      descriptor.match(new RegExp(String.raw`\/FontName\s*${nameToken}`))?.[1] ??
      '(unnamed)'
    fonts.push({ name: name.replace(/^[A-Z]{6}\+/, ''), subtype, chars: toUnicode(dict) })
  }
  return fonts
}
