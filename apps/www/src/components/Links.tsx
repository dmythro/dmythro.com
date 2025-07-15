import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import type { FC } from 'react'
import { SOCIAL_LINKS, SOCIAL_LINKS_WORK } from 'src/constants'

export const iconSize = 30
const links = [...SOCIAL_LINKS_WORK, ...SOCIAL_LINKS]

export const Links: FC = () => (
  <div className="flex flex-wrap w-full gap-2 overflow-auto">
    {links.map(({ Icon, title, href }) => (
      <Button
        key={href}
        as={Link}
        className="bg-gradient-to-tr from-purple-600 to-primary-500 text-white shadow-lg px-2 print:bg-none print:text-black print:shadow-none"
        // @ts-ignore
        href={href}
        // @ts-ignore
        isExternal
        rel="me"
        startContent={
          <Icon
            className="fill-white print:fill-black"
            width={iconSize}
            height={iconSize}
            fill="white"
          />
        }
      >
        {title}
      </Button>
    ))}
  </div>
)
