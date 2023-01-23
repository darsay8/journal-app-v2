import { FirebaseDB } from '@/firebase/config'
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updatedNote,
} from './journalSlice'
import { fileUpload, loadNotes } from '@/helpers'

export const startNewNote = () => async (dispatch, getState) => {
  dispatch(savingNewNote())

  const { uid } = getState().auth

  const newNote = {
    title: '',
    body: '',
    imageUrls: [],
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

export const startUploadingFiles = files => async dispatch => {
  dispatch(setSaving())
  const fileUploadPromises = []
  for (const file of files) {
    fileUploadPromises.push(fileUpload(file))
  }

  const imagesURL = await Promise.all(fileUploadPromises)
  dispatch(setPhotosToActiveNote(imagesURL))
}

export const startDeleteNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth
  const { active: activeNote } = getState().journal

  const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
  await deleteDoc(docRef)

  dispatch(deleteNoteById(activeNote.id))
}
