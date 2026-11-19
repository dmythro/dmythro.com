declare module 'subset-font' {
  export default function subsetFont(
    font: Buffer,
    text: string,
    options?: {
      targetFormat?: 'sfnt' | 'woff' | 'woff2' | 'truetype'
      keepFeatures?: string[]
      noHinting?: boolean
    },
  ): Promise<Buffer>
}
