import { Link } from '@heroui/link'
import NextLink from 'next/link'
import type { FC } from 'react'
import PdfFileIcon from 'src/assets/file-pdf-solid.svg'
import type { LangProp } from 'src/types'

export const CVPdfLink: FC<LangProp> = ({ lang }) => {
  const title = `CV.${lang}.pdf`

  return (
    <Link
      as={NextLink}
      color="foreground"
      href={`/cv.${lang}.pdf`}
      hrefLang={lang}
      isBlock
      title={title}
      underline="always"
    >
      <PdfFileIcon className="fill-foreground" width={16} height={16} />
      &nbsp;{title}
    </Link>
  )
}
