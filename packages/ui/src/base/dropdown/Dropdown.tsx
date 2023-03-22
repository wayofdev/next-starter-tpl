import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import type { FC, ReactNode } from 'react'
import DropdownItem, { type DropdownItemType } from './DropdownItem'

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

export type DropdownProps = {
  align?: DropdownAlign
  widthClass?: string
  contentClasses?: string
  trigger?: ReactNode
  items: DropdownItemType[]
}

const Dropdown: FC<DropdownProps> = ({
  align = DropdownAlign.Right,
  widthClass = 'w-48',
  contentClasses = 'py-1 bg-white',
  trigger,
  items,
}) => {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button as={Fragment}>
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
              className={`absolute z-50 mt-2 ${widthClass} rounded-md shadow-lg ${alignmentClasses[align]}`}
            >
              <Menu.Items
                className={`rounded-md focus:outline-none ring-1 ring-black ring-opacity-5 ${contentClasses}`}
                static
              >
                {items?.map((item, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => <DropdownItem item={item} isActive={active} />}
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
