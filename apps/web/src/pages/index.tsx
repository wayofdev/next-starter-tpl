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
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Boop
      </button>
    </>
  )
}
