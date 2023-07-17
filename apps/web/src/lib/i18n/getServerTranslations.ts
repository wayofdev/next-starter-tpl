/**
 * Retrieve translations on server-side, wraps next-i18next.serverSideTranslations
 * to allow further customizations.
 */
import type { I18nNamespaces } from '@wayofdev/common-i18n'
import type { SSRConfig, UserConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18nextConfig from '../../../next-i18next.config.mjs'

export const getServerTranslations = async (
  locale: string,
  namespacesRequired?: (keyof I18nNamespaces)[] | undefined,
  configOverride?: UserConfig | null
): Promise<SSRConfig> => {
  const config = configOverride ?? nextI18nextConfig

  // Slice needed here cause serverSlideTranslations does not accept Readonly type
  return serverSideTranslations(locale, namespacesRequired?.slice(), config)
}
