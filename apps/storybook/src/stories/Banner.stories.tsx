import type { Meta, StoryObj } from '@storybook/react'
import type { BannerProps } from '@wayofdev/ui/src'
import { Banner } from '@wayofdev/ui/src'

const meta = {
  title: 'Example/Banner',
  component: Banner,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<BannerProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: "Big news! We're excited to announce a brand new product.",
  },
}
