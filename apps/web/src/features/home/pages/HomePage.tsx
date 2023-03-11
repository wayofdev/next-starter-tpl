import { event } from '@wayofdev/facebook-pixel/src/lib/fpixel'
import { Banner, Button } from '@wayofdev/ui'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { MainNav } from '@/components/nav/MainNav'
import { homeConfig } from '../home.config'

export const HomePage: FC = () => {
  const { t } = useTranslation(homeConfig.i18nNamespaces)
  const handleClick = () => {
    event('Purchase', { value: 10, currency: 'USD', test_event_code: 'TEST24819' })
  }

  return (
    <>
      <NextSeo
        title={t('demo:page.title')}
        description="Web-app nextjs monorepo example, https://github.com/wayofdev/nextjs-monorepo-example"
      />
      <MainLayout>
        <Banner message="Something big will happen soon!" />
        <MainNav />
        <Button onClick={handleClick} label="Buy 10$">
          Buy 10$
        </Button>
      </MainLayout>
    </>
  )
}
