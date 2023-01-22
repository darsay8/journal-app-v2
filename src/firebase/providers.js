import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const singIngWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(result)
    const { displayName, email, photoURL, uid } = result.user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    }
  } catch (e) {
    const errorCode = e.error
    const errorMessage = e.message
    return {
      ok: false,
      errorCode,
      errorMessage,
    }
  }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = resp.user
    await updateProfile(FirebaseAuth.currentUser, {
      displayName,
    })
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    }
  } catch (e) {
    const errorCode = e.error
    const errorMessage = e.message
    return {
      ok: false,
      errorCode,
      errorMessage,
    }
  }
}

export const signInWithEmailPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)

    const { displayName, photoURL, uid } = result.user
    return {
      ok: true,
      displayName,
      photoURL,
      uid,
    }
  } catch (e) {
    const errorCode = e.error
    const errorMessage = e.message
    return {
      ok: false,
      errorCode,
      errorMessage,
    }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
