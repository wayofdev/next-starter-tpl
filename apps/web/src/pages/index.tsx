import { Button } from '@wayofdev/ui'
import * as React from 'react'

export default function Web() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        <h1>Web</h1>
        <Button />
      </div>
      <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
        Boop
      </button>
      <button
        type="button"
        onClick={() => {
          throw new Error('Sentry Frontend Error')
        }}
      >
        Throw error
      </button>
    </>
  )
}
