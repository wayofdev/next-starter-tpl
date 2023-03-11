import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import React from 'react'

export enum DropdownAlign {
  Left = 'left',
  Top = 'top',
  Right = 'right',
}

const alignmentClasses: Record<DropdownAlign, string> = {
  [DropdownAlign.Left]: 'origin-top-left left-0',
  [DropdownAlign.Top]: 'origin-top',
  [DropdownAlign.Right]: 'origin-top-right right-0',
}

export enum DropdownVariant {
  Button = 'button',
  Link = 'link',
}

export type DropdownItemType = {
  variant?: DropdownVariant
  element?: ReactNode
  props?: LinkProps | ButtonHTMLAttributes<HTMLButtonElement>
}

type Props = {
  align?: DropdownAlign
  width?: number
  contentClasses?: string
  trigger?: ReactNode
  items: DropdownItemType[]
}

const Dropdown: FC<Props> = ({
  align = DropdownAlign.Right,
  width = 48,
  contentClasses = 'py-1 bg-white',
  trigger,
  items,
}) => {
  const dropdownItemRenderer = (params: DropdownItemType, isActive = false) => {
    if (!params.variant) {
      return <>{params.element}</>
    }

    const classNames = clsx(
      'w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out',
      { 'bg-gray-100': isActive }
    )

    const linkProps = (params.props || { href: '#' }) as LinkProps
    const btnProps = (params.props || {}) as ButtonHTMLAttributes<HTMLButtonElement>

    return params.variant === DropdownVariant.Link ? (
      <Link {...linkProps} className={classNames}>
        {params.element}
      </Link>
    ) : (
      <button {...btnProps} className={classNames}>
        {params.element}
      </button>
    )
  }

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button as={React.Fragment}>
            {trigger || (
              <button className="flex items-center text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            )}
          </Menu.Button>
          <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div
              className={`absolute z-50 mt-2 w-${width} rounded-md shadow-lg ${alignmentClasses[align]}`}
            >
              <Menu.Items
                className={`rounded-md focus:outline-none ring-1 ring-black ring-opacity-5 ${contentClasses}`}
                static
              >
                {items?.map((item, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => dropdownItemRenderer(item, active)}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </div>
          </Transition>
        </>
      )}
    </Menu>
  )
}
export default Dropdown
