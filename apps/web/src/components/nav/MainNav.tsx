import type { NavigationItemType, LogoutBtnType, DropdownItemType } from '@wayofdev/ui'
import { Header, Button, Size, Mode, Dropdown, DropdownItemVariant } from '@wayofdev/ui'
import { useRouter } from 'next/compat/router'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import type { FC } from 'react'
import AppLogo from '@/components/app-logo/AppLogo'

export const MainNav: FC = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const isAuthenticated = !!session?.user

  const navigation: NavigationItemType[] = [
    { title: 'Home', href: '/' },
    { title: 'Products', href: '/products' },
  ]
  const userNavigation: NavigationItemType[] = [
    { title: 'Profile', href: '/profile' },
    { title: 'Settings', href: '/settings' },
    { title: 'My Orders', href: '/my-orders' },
  ]

  const logoutConfig: LogoutBtnType = { label: 'Logout', onClick: () => signOut() }

  const logoBlock = (
    <Link href="/">
      <AppLogo className="block h-10 w-auto fill-current text-gray-600" />
    </Link>
  )

  const guestBlock = (
    <Button size={Size.XSmall} mode={Mode.Primary} label="Sign In" onClick={() => signIn()} />
  )

  const dropdownItems: DropdownItemType[] = [
    ...userNavigation.map(n => ({
      variant: DropdownItemVariant.Link,
      element: n.title,
      props: { href: n.href },
    })),
    { variant: DropdownItemVariant.Button, element: 'Logout', props: { onClick: () => signOut() } },
  ]

  const triggerContent = isAuthenticated && (
    <>
      <div>{session?.user?.email || session?.user?.name}</div>

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
    </>
  )

  const authBlock = (
    <Dropdown
      items={dropdownItems}
      trigger={
        <button className="flex items-center text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
          {triggerContent}
        </button>
      }
    />
  )

  const userBlock = isAuthenticated && (
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
        <div className="text-base font-medium text-gray-800">{session?.user?.name}</div>
        <div className="text-sm font-medium text-gray-500">{session?.user?.email}</div>
      </div>
    </div>
  )

  return (
    <Header
      activePath={router?.pathname}
      isAuthenticated={isAuthenticated}
      navigation={navigation}
      userNavigation={userNavigation}
      logoutConfig={logoutConfig}
      logo={logoBlock}
      userBlock={userBlock}
      triggerContent={triggerContent}
      authBlock={authBlock}
      guestBlock={guestBlock}
    />
  )
}
