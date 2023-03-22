import type { Meta, StoryObj } from '@storybook/react'
import type { DropdownProps } from '@wayofdev/ui/src'
import { Dropdown, DropdownAlign, DropdownItemVariant } from '@wayofdev/ui/src'

const meta = {
  title: 'Example/Dropdown',
  component: Dropdown,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'centered',
  },
  args: {
    items: [
      { variant: DropdownItemVariant.Link, element: 'Profile', props: { href: '/#Profile' } },
      { variant: DropdownItemVariant.Link, element: 'Settings', props: { href: '/#Settings' } },
      { variant: DropdownItemVariant.Link, element: 'My Orders', props: { href: '/#MyOrders' } },
      { variant: DropdownItemVariant.Button, element: 'Logout' },
    ],
    align: DropdownAlign.Left,
  },
} satisfies Meta<DropdownProps>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownAlignLeft: Story = {
  args: {},
}

export const DropdownAlignRight: Story = {
  args: {
    align: DropdownAlign.Right,
  },
}

export const DropdownLinkElement: Story = {
  args: {
    items: [
      { variant: DropdownItemVariant.Link, element: 'Profile', props: { href: '/#Profile' } },
      { variant: DropdownItemVariant.Link, element: 'Settings', props: { href: '/#Settings' } },
      { variant: DropdownItemVariant.Link, element: 'My Orders', props: { href: '/#MyOrders' } },
    ],
  },
}

export const DropdownButtonElement: Story = {
  args: {
    items: [
      { variant: DropdownItemVariant.Button, element: 'Make Action' },
      { variant: DropdownItemVariant.Button, element: 'Logout' },
    ],
  },
}

export const DropdownCustomElement: Story = {
  args: {
    items: [
      {
        element: (
          <div className="block w-full bg-gray-800 px-4 py-2 text-right leading-5 text-white transition duration-150 ease-in-out focus:outline-none">
            Profile
          </div>
        ),
      },
    ],
  },
}

export const CustomTriggerMenu: Story = {
  args: {
    trigger: (
      <button className="flex items-center text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
        <div>john.doe@example.com</div>

        <div className="ml-1">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
    ),
  },
}

export const DropdownCustomWidth: Story = {
  args: {
    widthClass: 'w-80',
  },
}

export const DropdownCustomClass: Story = {
  args: {
    contentClasses: 'py-1.5 bg-purple-200',
  },
}
