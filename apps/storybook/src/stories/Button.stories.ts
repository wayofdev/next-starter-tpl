import type { Meta, StoryObj } from '@storybook/react'

// import { Button, Size, Mode } from '../../../../packages/ui/src/base/button/Button'
import { Button, Size, Mode } from '@wayofdev/ui/src/base/button/Button'
// import { Button, Size, Mode } from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    label: 'Button',
    mode: Mode.Primary,
    size: Size.Base,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    mode: Mode.Primary,
    size: Size.Base,
    label: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    mode: Mode.Secondary,
    size: Size.Base,
    label: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: Size.Large,
    label: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: Size.Small,
    label: 'Button',
  },
}
