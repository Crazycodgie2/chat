import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import AuthRoute from "../lib/AuthRoute"

import Login from "./Login"
import Foo from "./Foo"

export default props => {
  return (
    <Router>
      <div>
        <AuthRoute exact path="/" component={Foo} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  )
}
