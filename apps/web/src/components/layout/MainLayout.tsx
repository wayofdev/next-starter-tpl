import type { FC, ReactNode } from 'react'
import { MainFooter } from '@/components/layout/MainFooter'

export const MainLayout: FC<{ children: ReactNode }> = props => {
  const { children } = props
  return (
    <div className="min-h-screen bg-gray-100">
      <main>{children}</main>
      <MainFooter />
    </div>
  )
}
