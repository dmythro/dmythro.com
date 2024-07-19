import type { FC } from 'react'

import { Chip } from '@nextui-org/chip'

import type { TimelineItem } from 'my-locales'

import './Timeline.module.css'

interface TimelineProps {
  title?: string
  items?: TimelineItem[]
}

interface TimelineBlockProps {
  item: TimelineItem
}

export const TimelineBlock: FC<TimelineBlockProps> = ({ item }) => {
  const { title, subtitle, description, when, till, where, isHighlighted } = item

  if ((!when && !till) || (!title && !subtitle && !description)) {
    return null
  }

  const whereBlock = where && (
    <>
      <span className="font-light"> &ndash; {where}</span>
    </>
  )

  const descriptionBlock = description && (
    <div className="text-foreground-600">
      {Array.isArray(description)
        ? description.map((line, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: lines won't change here
            <p key={index} className="my-2">
              {line}
            </p>
          ))
        : description}
    </div>
  )

  return (
    <div className="timeline-block group">
      <div className="timeline-block-content group-last:before:hidden">
        <Chip as="time" color="success" variant="bordered" className="timeline-block-time">
          {when && till ? (
            <>
              <span>{when}</span>
              <span className="rotate-90 sm:transform-none">&uarr;</span>
              <span>{till}</span>
            </>
          ) : (
            when || till
          )}
        </Chip>

        <div>
          {title && <h2 className={isHighlighted ? 'font-bold' : 'font-normal'}>{title}</h2>}
          {subtitle && (
            <h3>
              {subtitle}
              {whereBlock}
            </h3>
          )}
          {descriptionBlock}
        </div>
      </div>
    </div>
  )
}

export const Timeline: FC<TimelineProps> = ({ title, items = [] }) => {
  return (
    <section className="mb-8">
      {title && (
        <h1 className="font-semibold my-6 text-2xl print:break-after-avoid print:break-before-page">
          {title}
        </h1>
      )}

      <div className="-my-4">
        {items.map((item, i) => (
          <TimelineBlock key={item.when || item.till || i} item={item} />
        ))}
      </div>
    </section>
  )
}
