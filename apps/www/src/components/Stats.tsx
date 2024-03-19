'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { type FC, useCallback, useRef, useState } from 'react'

import type { SkillTime } from 'my-locales'

interface StatProps {
  item: SkillTime
  isExpanded?: boolean
  onClick?: () => void
}

interface StatsProps {
  items: SkillTime[]
  isExpanded?: boolean
  title?: string
}

export const Stat: FC<StatProps> = ({ item, isExpanded, onClick }) => (
  <Card
    className="print:break-inside-avoid-page print:shadow-none border-1"
    shadow="none"
    isHoverable
    isPressable
    radius="md"
    onClick={onClick}
  >
    <CardHeader className="flex flex-row">
      <div className="flex flex-col flex-grow gap-1">
        <h3 className="text-md">{item.title}</h3>
        <div className="text-small text-default-500">{item.subtitle}</div>
      </div>
    </CardHeader>
    {isExpanded && (
      <CardBody className="print:text-sm">
        {Array.isArray(item.description) ? item.description.join(' ') : item.description}
      </CardBody>
    )}
  </Card>
)

export const Stats: FC<StatsProps> = ({ items, isExpanded, title }) => {
  const [expanded, setExpanded] = useState(isExpanded)
  const ref = useRef<HTMLHeadingElement>()
  const handleClick = useCallback(() => {
    setExpanded(!expanded)

    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 250)
  }, [expanded])

  return (
    <>
      {title && (
        <h1
          ref={ref}
          className="print:break-before-page print:break-after-avoid font-semibold my-6 text-2xl"
        >
          {title}
        </h1>
      )}

      <div
        className={`clear-both grid ${
          expanded ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
        } gap-4 rounded print:grid-cols-3`}
      >
        {items.map((item) => (
          <Stat key={item.title} item={item} isExpanded={expanded} onClick={handleClick} />
        ))}
      </div>
    </>
  )
}
