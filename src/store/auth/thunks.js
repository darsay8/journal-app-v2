import { checkingCredentials } from './authSlice'

export const checkingAuth = (email, password) => async dispatch => {
  dispatch(checkingCredentials())
}

export const startGoogleSignIn = () => async dispatch => {
  dispatch(checkingCredentials())
}
