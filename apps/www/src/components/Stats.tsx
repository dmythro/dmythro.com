import { FC, useState } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/card'

import type { SkillLevel, SkillTime } from 'my-locales'

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

  return (
    <>
      {title && (
        <h1 className="print:break-before-page print:break-after-avoid font-semibold my-6 text-2xl">
          {title}
        </h1>
      )}

      <div
        className={`clear-both grid ${
          expanded ? 'grid-cols-1' : 'grid-cols-2'
        } sm:${
          expanded ? 'grid-cols-2' : 'grid-cols-3'
        } gap-4 rounded print:grid-cols-3`}
      >
        {items.map((item) => (
          <Stat
            key={item.title}
            item={item}
            isExpanded={expanded}
            onClick={() => setExpanded(!expanded)}
          />
        ))}
      </div>
    </>
  )
}
