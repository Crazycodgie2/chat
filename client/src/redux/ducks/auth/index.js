import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS"
const LOGIN_FAILURE = "auth/LOGIN_FAILURE"
const LOGIN_PENDING = "auth/LOGIN_PENDING"
const LOGOUT = "auth/LOGOUT"

let interceptor = {}

const initialState = {
  isAuthenticated: false,
  pending: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, pending: false }
    case LOGIN_FAILURE:
      return { ...state, isAuthenticated: false, pending: false }
    case LOGIN_PENDING:
      return { ...state, isAuthenticated: false, pending: true }
    case LOGOUT:
      return { ...state, isAuthenticated: false, pending: false }
    default:
      return state
  }
}

function authenticate(username, password) {
  return dispatch => {
    dispatch({
      type: LOGIN_PENDING
    })

    axios
      .post("/api/login", { username, password })
      .then(resp => {
        const token = resp.data.token

        interceptor = axios.interceptors.request.use(config => {
          config.headers = { Authentication: `Bearer ${token}` }
        })

        dispatch({
          type: LOGIN_SUCCESS
        })
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILURE
        })
      })
  }
}

function deauthenticate() {
  axios.interceptors.request.eject(interceptor)

  return {
    type: LOGOUT
  }
}

export function useAuth() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(
    appState => appState.authState.isAuthenticated
  )
  const login = (username, password) =>
    dispatch(authenticate(username, password))
  const logout = () => dispatch(deauthenticate)

  return { login, isAuthenticated, logout }
}
