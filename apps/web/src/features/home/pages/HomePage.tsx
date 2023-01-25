import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { Banner } from '@/components/banner/Banner'
import { MainLayout } from '@/components/layout/MainLayout'
import { homeConfig } from '../home.config'

export const HomePage: FC = () => {
  const { t } = useTranslation(homeConfig.i18nNamespaces)

  return (
    <>
      <NextSeo
        title={t('demo:page.title')}
        description="Web-app nextjs monorepo example, https://github.com/belgattitude/nextjs-monorepo-example"
      />
      <MainLayout>
        <Banner />
        <h3>I'm the web-app</h3>
        <ul>
          <li>{`Foo says: `}</li>
        </ul>
        <Image
          src={'/shared-assets/images/nextjs-logo.png'}
          alt={'logo'}
          width={400}
          height={240}
        />
        <div className={'pt-8'} />
        <div className={'pt-8'} />
      </MainLayout>
    </>
  )
}
