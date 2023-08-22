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
    className="print:break-inside-avoid-page"
    shadow="sm"
    isHoverable
    isPressable
    radius="md"
    onClick={onClick}
  >
    <CardHeader className="flex flex-row print:break-inside-avoid-page">
      <div className="flex flex-col flex-grow gap-1">
        <h3 className="text-md">{item.title}</h3>
        <div className="text-small text-default-500">{item.subtitle}</div>
      </div>
    </CardHeader>
    {isExpanded && (
      <CardBody>
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
        <h1 className="print:break-before-page font-semibold my-6 text-2xl print:break-after-avoid">
          {title}
        </h1>
      )}

      <div
        className={`clear-both grid grid-cols-${
          expanded ? 2 : 3
        } gap-4 px-4 rounded border-x-2 print:break-inside-avoid-column`}
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
