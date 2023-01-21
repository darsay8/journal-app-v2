import {
  registerUserWithEmailPassword,
  signInWithEmailPassword,
  singIngWithGoogle,
} from '@/firebase/providers'
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

export const startRegisterUserWithEmailPassword =
  ({ email, password, displayName }) =>
  async dispatch => {
    dispatch(checkingCredentials())
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    })

    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, displayName, email, photoURL }))
  }

export const startSignInWithEmailPassword =
  ({ email, password }) =>
  async dispatch => {
    dispatch(checkingCredentials())

    const { ok, uid, displayName, photoURL, errorMessage } = await signInWithEmailPassword({
      email,
      password,
    })

    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, displayName, email, photoURL }))
  }
