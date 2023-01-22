import { FirebaseDB } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore/lite'

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('User UID does not exist')

  const collRef = collection(FirebaseDB, `${uid}/journal/notes`)
  const docs = await getDocs(collRef)

  const notes = []

  docs.forEach(doc => {
    notes.push({ id: doc.id, ...doc.data() })
  })

  return notes
}
