import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
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
