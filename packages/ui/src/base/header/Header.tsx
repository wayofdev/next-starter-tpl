import { Dialog } from '@headlessui/react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import type { FC, ReactNode, MouseEventHandler } from 'react'

type NavigationItemType = { title: string; href: string }
type AuthBtnType = NavigationItemType & { onClick?: MouseEventHandler<HTMLAnchorElement> }

type Props = {
  className?: string
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
    logo,
    navigation,
    userNavigation,
    signInConfig,
    signUpConfig,
    logoutConfig,
    authBlock,
  } = props

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const unAuthBlock = () =>
    !!signInConfig || !!signUpConfig ? (
      <div className="flex flex-1 items-center justify-end gap-x-6">
        {!!signInConfig && (
          <a
            href={signInConfig.href}
            className="block text-sm font-semibold leading-6 text-gray-900"
            onClick={signInConfig.onClick}
          >
            {signInConfig.title}
          </a>
        )}
        {!!signUpConfig && (
          <a
            href={signUpConfig.href}
            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={signUpConfig.onClick}
          >
            {signUpConfig.title}
          </a>
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
            {navigation.map(item => (
              <a
                key={item.title}
                href={item.href}
                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.title}
              </a>
            ))}
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
                  {navigation.map(item => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}

              <div className="py-6">
                {!authBlock && userNavigation && (
                  <div className="space-y-2 py-6">
                    {userNavigation.map(item => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.title}
                      </a>
                    ))}

                    {!!logoutConfig && (
                      <a
                        key={logoutConfig.title}
                        href={logoutConfig.href}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={logoutConfig.onClick}
                      >
                        {logoutConfig.title}
                      </a>
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
