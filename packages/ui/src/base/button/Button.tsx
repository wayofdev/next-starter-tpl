import clsx from 'clsx'
import type { ButtonHTMLAttributes, FC } from 'react'

export enum Size {
  XSmall = 'rounded px-2.5 py-1.5 text-xs',
  Small = 'rounded-md px-3 py-2 text-sm',
  Base = 'rounded-md px-4 py-2 text-sm',
  Large = 'rounded-md px-4 py-2 text-base',
  XLarge = 'rounded-md px-6 py-3 text-base',
}

export enum Mode {
  Primary = 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  Secondary = 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Is this the principal call to action on the page?
   */
  mode?: Mode
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: Size
  /**
   * Button contents
   */
  label: string
}

const Button: FC<ButtonProps> = ({
  mode = Mode.Primary,
  size = Size.Base,
  backgroundColor,
  label,
  ...properties
}) => {
  const baseClasses = 'inline-flex items-center border focus:outline-none font-medium shadow-sm'

  return (
    <button className={clsx(size, mode, baseClasses)} {...properties}>
      {label}
    </button>
  )
}

export default Button
