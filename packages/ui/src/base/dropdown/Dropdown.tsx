import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import React from 'react'

const alignmentClasses = {
  left: 'origin-top-left left-0',
  top: 'origin-top',
  right: 'origin-top-right right-0',
}

type DropdownItemType = {
  variant: 'button' | 'link'
  children: ReactNode
  props?: LinkProps | ButtonHTMLAttributes<HTMLButtonElement>
}

type Props = {
  align?: 'left' | 'top' | 'right'
  width?: number
  contentClasses?: string
  trigger: ReactNode
  items: DropdownItemType[]
}

const Dropdown: FC<Props> = ({
  align = 'right',
  width = 48,
  contentClasses = 'py-1 bg-white',
  trigger,
  items,
}) => {
  const dropdownItemRenderer = (params: DropdownItemType, isActive = false) => {
    const classNames = clsx(
      'w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out',
      { 'bg-gray-100': isActive }
    )

    const linkProps = (params.props || { href: '#' }) as LinkProps
    const btnProps = (params.props || {}) as ButtonHTMLAttributes<HTMLButtonElement>

    return params.variant === 'link' ? (
      <Link {...linkProps} className={classNames}>
        {params.children}
      </Link>
    ) : (
      <button {...btnProps} className={classNames}>
        {params.children}
      </button>
    )
  }

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button as={React.Fragment}>{trigger}</Menu.Button>
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
                  <Menu.Item key={item.variant + i}>
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
