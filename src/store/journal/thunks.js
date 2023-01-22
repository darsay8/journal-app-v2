import { FirebaseDB } from '@/firebase/config'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite'
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updatedNote,
} from './journalSlice'
import { loadNotes } from '@/helpers'

export const startNewNote = () => async (dispatch, getState) => {
  dispatch(savingNewNote())

  const { uid } = getState().auth

  const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
  }

  const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
  await setDoc(newDoc, newNote)

  newNote.id = newDoc.id
  dispatch(addNewEmptyNote(newNote))
  dispatch(setActiveNote(newNote))
}

export const startLoadingNotes = () => async (dispatch, getState) => {
  const { uid } = getState().auth
  if (!uid) throw new Error('User UID does not exist')
  const notes = await loadNotes(uid)
  dispatch(setNotes(notes))
}

export const startSaveNote = activeNote => async (dispatch, getState) => {
  dispatch(setSaving())

  const { uid } = getState().auth

  const noteToFirestore = { ...activeNote }
  delete noteToFirestore.id

  const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
  await setDoc(docRef, noteToFirestore, { merge: true })

  dispatch(updatedNote(activeNote))
}
