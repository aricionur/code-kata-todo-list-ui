import { JwtPayload, jwtDecode } from "jwt-decode"
import React, { FC, createContext, useContext, useReducer } from "react"

let token = null

export interface User {
  id: number
  username: string
  email: string
  token: string
}

interface AuthState {
  user: User | null
}

interface DecodedToken extends Pick<User, "id" | "email" | "username"> {
  iat: number
  exp: number
}

const initialState: AuthState = { user: null }

if (typeof window !== undefined) token = window.localStorage.getItem("token")

if (token) {
  const decodedToken = jwtDecode<DecodedToken>(token)

  if ((decodedToken?.exp ?? 0) * 1000 < Date.now()) window.localStorage.removeItem("token")
  else {
    const { exp, iat, ...userData } = decodedToken
    console.log("decodedToken", decodedToken)
    initialState.user = { ...userData, token }
  }
}

console.log("initialState", initialState)

// TODO : create userdata type
export const AuthContext = createContext({ state: initialState, login: (userData: any) => {}, logout: () => {} })

enum AuthActionType {
  LOGIN,
  LOGOUT,
}

type AuthAction = { type: AuthActionType.LOGIN; payload: AuthState } | { type: AuthActionType.LOGOUT }

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return { ...state, ...action.payload }
      break
    case AuthActionType.LOGOUT:
      return { user: null }
    default:
      return state
  }
}

interface AuthProvider {
  children: React.ReactElement
}

export const AuthProvider: FC<AuthProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Todo: define userDAta type
  const login = (user: User) => {
    console.log("inside login() - user:", user)

    window.localStorage.setItem("token", JSON.stringify(user.token))

    dispatch({ type: AuthActionType.LOGIN, payload: { user } })
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    dispatch({ type: AuthActionType.LOGOUT })
  }

  return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const { state, login, logout } = useContext(AuthContext)

  // do additional things if needed.

  return { state, login, logout }
}
