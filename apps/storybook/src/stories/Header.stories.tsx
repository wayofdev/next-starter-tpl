import type { Meta, StoryObj } from '@storybook/react'
import type { HeaderProps } from '@wayofdev/ui/src'
import { Header } from '@wayofdev/ui/src'

const meta = {
  title: 'Example/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<HeaderProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const LoggedOut: Story = {}

// More on interaction testing: https://storybook.js.org/docs/7.0/react/writing-tests/interaction-testing
export const LoggedIn: Story = {}
