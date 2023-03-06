import { Dialog } from '@headlessui/react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import type { FC, ReactNode, MouseEventHandler } from 'react'
import { Button, Mode, Size } from '../button/Button'

const linkClasses = {
  main: 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out',
  active: 'border-indigo-400 text-gray-900 focus:border-indigo-700',
  inactive:
    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300',
}

const linkClassesResponsive = {
  main: 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out',
  active: 'border-indigo-400 text-gray-900 focus:border-indigo-700',
  inactive:
    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300',
}

type NavigationItemType = { title: string; href: string }
type AuthBtnType = { label: string; onClick?: MouseEventHandler<HTMLButtonElement> }

type Props = {
  className?: string
  activePath?: string
  logo: ReactNode
  navigation?: NavigationItemType[]
  userNavigation: NavigationItemType[]
  authBlock: ReactNode
  signInConfig?: AuthBtnType
  signUpConfig?: AuthBtnType
  logoutConfig?: AuthBtnType
}

export const Header: FC<Props> = props => {
  const {
    className,
    activePath,
    logo,
    navigation,
    userNavigation,
    signInConfig,
    signUpConfig,
    logoutConfig,
    authBlock,
  } = props

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinkRenderer = (params: NavigationItemType, isResponsive = false) => {
    const classes = isResponsive ? linkClassesResponsive : linkClasses
    const classNames = clsx(
      classes.main,
      { [classes.active]: params.href === activePath },
      { [classes.inactive]: params.href !== activePath }
    )

    return (
      <Link key={params.title} href={params.href} className={classNames}>
        {params.title}
      </Link>
    )
  }

  const unAuthBlock = () =>
    !!signInConfig || !!signUpConfig ? (
      <div className="flex flex-1 items-center justify-end gap-x-6">
        {!!signInConfig && (
          <Button
            size={Size.XSmall}
            mode={Mode.Primary}
            label={signInConfig.label}
            onClick={signInConfig.onClick}
          >
            {signInConfig.label}
          </Button>
        )}
        {!!signUpConfig && (
          <Button
            size={Size.XSmall}
            mode={Mode.Primary}
            label={signUpConfig.label}
            onClick={signUpConfig.onClick}
          >
            {signUpConfig.label}
          </Button>
        )}
      </div>
    ) : null

  return (
    <header className={clsx('bg-white', className)}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        {!!logo && <div className="flex lg:flex-1">{logo}</div>}

        {navigation && (
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map(item => navLinkRenderer(item))}
          </div>
        )}

        <div className="flex flex-1 items-center justify-end gap-x-6">
          {!authBlock ? unAuthBlock() : <>{authBlock}</>}
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            {!!logo && <>{logo}</>}

            {!authBlock && unAuthBlock()}

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {navigation && (
                <div className="space-y-2 py-6">
                  {navigation.map(item => navLinkRenderer(item, true))}
                </div>
              )}

              <div className="py-6">
                {!authBlock && userNavigation && (
                  <div className="space-y-2 py-6">
                    {userNavigation.map(item => navLinkRenderer(item, true))}

                    {!!logoutConfig && (
                      <button
                        className="block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
                        onClick={logoutConfig.onClick}
                      >
                        {logoutConfig.label}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
