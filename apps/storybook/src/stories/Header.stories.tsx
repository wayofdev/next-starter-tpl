import type { Meta, StoryObj } from '@storybook/react'
import type { HeaderProps } from '@wayofdev/ui/src'
import { Button, Dropdown, DropdownItemVariant, Header } from '@wayofdev/ui/src'
import Img from './assets/colors.svg'

const triggerContent = (
  <>
    <div>john.doe@example.com</div>

    <div className="ml-1">
      <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </>
)

const dropdownItems = [
  { variant: DropdownItemVariant.Button, element: 'Settings', props: { href: '/#Settings' } },
  { variant: DropdownItemVariant.Button, element: 'My orders', props: { href: '/#MyOrders' } },
  { variant: DropdownItemVariant.Button, element: 'Logout' },
]

const meta = {
  title: 'Example/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    isAuthenticated: false,
    activePath: '/',
    navigation: [
      { title: 'Home', href: '/' },
      { title: 'Products', href: '/#Products' },
    ],
    userNavigation: [
      { title: 'Settings', href: '/#Settings' },
      { title: 'My orders', href: '/#MyOrders' },
    ],
    logoutConfig: { label: 'Logout' },
    logo: <img src={Img} alt="logo" />,
    guestBlock: <Button label="Sign In" />,
    triggerContent,
    authBlock: (
      <Dropdown
        items={dropdownItems}
        trigger={
          <button className="flex items-center text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
            {triggerContent}
          </button>
        }
      />
    ),
    userBlock: (
      <div className="flex items-center px-4">
        <div className="shrink-0">
          <svg
            className="h-12 w-12 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <div className="ml-3">
          <div className="text-base font-medium text-gray-800">John Doe</div>
          <div className="text-sm font-medium text-gray-500">john.doe@example.com</div>
        </div>
      </div>
    ),
  },
} satisfies Meta<HeaderProps>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {}

export const LoggedIn: Story = {
  args: {
    isAuthenticated: true,
    triggerContent: undefined,
    authBlock: <Dropdown items={dropdownItems} />,
  },
}

export const CustomTriggerMenu: Story = {
  args: {
    isAuthenticated: true,
  },
}

export const CustomHeaderClass: Story = {
  args: {
    className: 'bg-green-200',
  },
}

export const MobileMenuUserInfo: Story = {
  args: {
    isAuthenticated: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonexsmax',
    },
  },
}
