'use client'

import { FC } from 'react'

import { Link } from '@nextui-org/link'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/modal'
import { ScrollShadow } from '@nextui-org/scroll-shadow'

import * as locales from 'my-locales'

import GitHubIcon from 'src/assets/github.svg'
import CodeIcon from 'src/assets/code-solid.svg'
import { WithLangProp } from 'src/types'
import { BuiltWith } from '../BuiltWith'

const lastPublishDate = new Date()

export const Footer: FC<WithLangProp> = ({ lang }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const t = locales[lang]

  return (
    <footer className="block relative clear-both text-center text-foreground-500 my-4">
      &copy; {lastPublishDate.getFullYear()} &bull;{' '}
      <Link
        color="foreground"
        href="https://github.com/dmythro/dmythro.com"
        anchorIcon={<GitHubIcon className="fill-foreground ml-1.5" width={16} height={16} />}
        showAnchorIcon
        underline="hover"
      >
        Source
      </Link>
      <span className="print:hidden">
        {' '}
        &bull;{' '}
        <Link
          anchorIcon={<CodeIcon className="fill-foreground ml-1.5 z-" width={16} height={16} />}
          className="cursor-pointer"
          color="foreground"
          showAnchorIcon
          underline="hover"
          onClick={onOpen}
        >
          {t.builtWith}
        </Link>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ closeButton: 'z-10' }} scrollBehavior="inside" size="lg">
          <ModalContent>
            <ScrollShadow>
              <ModalBody>
                <BuiltWith lang={lang} />
              </ModalBody>
            </ScrollShadow>
          </ModalContent>
        </Modal>
      </span>
    </footer>
  )
}
