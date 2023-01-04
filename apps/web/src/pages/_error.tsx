/**
 * NOTE: This requires `@sentry/nextjs` version 7.3.0 or higher.
 *
 * This page is loaded by NextJS:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in NextJS error boundary
 *
 * See:
 *  @link https://nextjs.org/docs/basic-features/data-fetching/overview
 *  @link https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  @link https://reactjs.org/docs/error-boundaries.html
 *
 *  Typescript class based component for custom-error
 *  @link https://nextjs.org/docs/advanced-features/custom-error-page
 */

import * as Sentry from '@sentry/nextjs'
import type { NextPage } from 'next'
import type { ErrorProps } from 'next/error'
import NextErrorComponent from 'next/error'

const CustomErrorComponent: NextPage<ErrorProps> = properties => {
  return <NextErrorComponent statusCode={properties.statusCode} />
}

CustomErrorComponent.getInitialProps = async contextData => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData)
}

export default CustomErrorComponent
