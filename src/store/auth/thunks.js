import { singIngWithGoogle } from '@/firebase/providers'
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuth = (email, password) => async dispatch => {
  dispatch(checkingCredentials())
}

export const startGoogleSignIn = () => async dispatch => {
  dispatch(checkingCredentials())
  const result = await singIngWithGoogle()

  if (!result.ok) return dispatch(logout(result))

  delete result.ok
  dispatch(login(result))
}
