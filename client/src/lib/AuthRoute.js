import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../hooks"

export default props => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />
}
