import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/solid'
import type { FC } from 'react'

export interface BannerProps {
  message: string

  children?: never
}

const Banner: FC<BannerProps> = ({ message }) => {
  return (
    <div className="bg-indigo-600">
      <div className="mx-auto max-w-7xl p-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true"></MegaphoneIcon>
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">{message}</span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="@/components/banner/Banner#"
              className="flex items-center justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
          <div className="order-2 shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"></XMarkIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
