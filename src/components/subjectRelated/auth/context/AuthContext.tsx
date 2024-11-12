import { JwtPayload, jwtDecode } from "jwt-decode"
import React, { FC, createContext, useContext, useReducer } from "react"

let token = null

interface AuthState {
  user: JwtPayload | null
}

const initialState: AuthState = { user: null }

if (typeof window !== undefined) token = window.localStorage.getItem("token")

if (token) {
  const decodedToken = jwtDecode(token)
  if ((decodedToken?.exp ?? 0) * 1000 < Date.now()) window.localStorage.removeItem("token")
  else initialState.user = decodedToken
}

// TODO : create userdata type
export const AuthContext = createContext({ user: initialState.user, login: (userData: any) => {}, logout: () => {} })

enum AuthActionType {
  LOGIN,
  LOGOUT,
}

type AuthAction = { type: AuthActionType.LOGIN; payload: AuthState["user"] } | { type: AuthActionType.LOGOUT }

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return { ...state, user: action.payload }
      break
    case AuthActionType.LOGOUT:
      return { ...state, user: null }
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
  const login = (userData: any) => {
    window.localStorage.setItem("token", userData.token)
    dispatch({ type: AuthActionType.LOGIN, payload: userData.token })
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    dispatch({ type: AuthActionType.LOGOUT })
  }

  return <AuthContext.Provider value={{ user: state.user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const { user, login, logout } = useContext(AuthContext)

  // do additional things if needed.

  return { user, login, logout }
}
