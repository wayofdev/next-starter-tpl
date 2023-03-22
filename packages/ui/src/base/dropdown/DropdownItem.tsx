import { clsx } from 'clsx'
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'

export enum DropdownItemVariant {
  Button = 'button',
  Link = 'link',
}

export type DropdownItemType = {
  variant?: DropdownItemVariant
  element?: ReactNode
  props?: LinkProps | ButtonHTMLAttributes<HTMLButtonElement>
}

const DropdownItem = forwardRef<HTMLButtonElement, { item: DropdownItemType; isActive?: boolean }>(
  ({ item, isActive = false }, ref) => {
    if (!item.variant) {
      return <>{item.element}</>
    }

    const classNames = clsx(
      'w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out',
      { 'bg-gray-100': isActive }
    )

    const linkProps = (item.props || { href: '#' }) as LinkProps
    const btnProps = (item.props || {}) as ButtonHTMLAttributes<HTMLButtonElement>

    return item.variant === DropdownItemVariant.Link ? (
      <Link {...linkProps} className={classNames}>
        {item.element}
      </Link>
    ) : (
      <button ref={ref} {...btnProps} className={classNames}>
        {item.element}
      </button>
    )
  }
)

DropdownItem.displayName = 'DropdownItem'

export default DropdownItem
