import { FC } from 'react'
import NextLink from 'next/link'
import { Link } from '@nextui-org/link'

import PdfFileIcon from 'src/assets/file-pdf-solid.svg'

import type { WithLangProp } from 'src/types'

export const CVPdfLink: FC<WithLangProp> = ({ lang }) => (
  <Link
    as={NextLink}
    color="foreground"
    href={`/cv.${lang}.pdf`}
    hrefLang={lang}
    isBlock
    // title={t.actions.backHome}
  >
    <PdfFileIcon className="fill-foreground" width={16} height={16} />
    &nbsp;CV.pdf
  </Link>
)
