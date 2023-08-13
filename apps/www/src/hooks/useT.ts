import { useContext } from 'react'
import type { Translation } from 'my-locales'
import { LocaleContext } from 'pages/_app'

export const useT = (): Translation => {
  const { messages } = useContext(LocaleContext)
  return messages
}
