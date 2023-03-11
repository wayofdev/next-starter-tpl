import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import { systemConfig } from '@/features/system/system.config'

type Properties = {
  title?: string
  children?: never
}

export const NotFoundPage: FC<Properties> = properties => {
  const { t } = useTranslation(systemConfig.i18nNamespaces)
  const title = properties.title ?? t('system:notFound.title')
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-white">
        <h1 data-testid="not-found-title" className="text-3xl text-black md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-center text-xl no-underline hover:underline">
          <a href={'/'}>{t('system:links.backToHome')}</a>
        </p>
      </div>
    </>
  )
}
