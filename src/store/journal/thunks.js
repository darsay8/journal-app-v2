import { FirebaseDB } from '@/firebase/config'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite'
import { addNewEmptyNote, savingNewNote, setActiveNote } from './journalSlice'

export const startNewNote = () => async (dispatch, getState) => {
  dispatch(savingNewNote())
  //uid
  const { uid } = getState().auth

  const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
  }

  // collRef = collection(FirebaseDB, `${uid}/journal/notes`)
  // await setDoc(doc(collRef), newNote)
  const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
  await setDoc(newDoc, newNote)

  newNote.id = newDoc.id
  dispatch(addNewEmptyNote(newNote))
  dispatch(setActiveNote(newNote))
}
