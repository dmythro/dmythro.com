import { FC } from 'react'

import { Chip } from '@nextui-org/chip'

import { TimelineItem } from 'my-locales'

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
            <p key={index} className="my-2">
              {line}
            </p>
          ))
        : description}
    </div>
  )

  const contentClasses = [
    'flex flex-col sm:flex-row items-start mb-1',
    // before: line
    'group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-foreground-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3',
    // after: dot
    'after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-primary-600 after:border-4 after:box-content after:border-foreground-200 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5',
  ].join(' ')

  const timeClasses = [
    'font-semibold text-center',
    'inline-flex sm:absolute left-0 translate-y-0.5 sm:min-w-unit-20 h-6 mb-3 sm:mb-0',
  ].join(' ')

  return (
    <div className="relative pl-8 sm:pl-32 py-4 group">
      <div className={contentClasses}>
        <Chip
          as="time"
          color="success"
          variant="bordered"
          className={timeClasses}
          classNames={{
            content: 'p-0.5 flex sm:flex-col-reverse gap-1',
            base: 'sm:h-auto sm:rounded-lg',
          }}
        >
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
          {title && (
            <h2
              className={`${
                isHighlighted ? 'font-bold' : 'font-normal'
              } text-xl text-primary mb-1 mt-0 sm:mb-0}`}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <h3 className="text-lg font-medium text-foreground my-1">
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
    <article>
      {title && <h1 className="font-semibold my-6 text-2xl">{title}</h1>}

      <div className="-my-4">
        {items.map((item, i) => (
          <TimelineBlock key={item.when || item.till || i} item={item} />
        ))}
      </div>
    </article>
  )
}
