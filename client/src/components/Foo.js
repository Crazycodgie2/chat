import React, { useEffect, useContext } from "react"
import { useFoo } from "../hooks"
import { useAuth } from "react-auth"

export default props => {
  const { get, foo } = useFoo()
  const { signout } = useAuth()

  useEffect(() => {
    get()
  }, [])

  return (
    <div>
      <h1>FOO: BAR</h1>
      <p>foo: {foo}</p>
      <button onClick={e => signout()}>Logout</button>
    </div>
  )
}
