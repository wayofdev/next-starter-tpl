import { Analytics } from '@vercel/analytics/react'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  /**
   * next-auth session
   */
  session?: Session | null
}>

export const AppProviders: FC<Props> = props => {
  const { children, session } = props
  return (
    <>
      <Analytics />
      <SessionProvider session={session} refetchInterval={0}>
        {children}
      </SessionProvider>
    </>
  )
}
