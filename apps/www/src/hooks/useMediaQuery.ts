'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [isMatch, setMatch] = useState<null | boolean>(null)

  const mq = typeof window === 'undefined' ? null : window.matchMedia(query)

  useEffect(() => {
    if (!mq) {
      return
    }

    mq.addEventListener('change', (mq) => {
      setMatch(mq.matches)
    })
  }, [mq])

  return isMatch
}

export function usePrint() {
  const [isPrint, setPrint] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.onbeforeprint = () => {
      setPrint(true)
    }
    window.onafterprint = () => {
      setPrint(false)
    }

    return () => {
      window.onbeforeprint = () => {}
      window.onafterprint = () => {}
    }
  }, [])

  return isPrint
}
