import { FlashOnRounded } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'
export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSave: '',
    notes: [],
    active: null,
    // active: {
    //   id:'',
    //   title:'',
    //   body:'',
    //   date:'',
    //   imageUrls:[]
    // }
  },
  reducers: {
    savingNewNote: state => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: state => {
      state.isSaving = true
      state.messageSaved = ''
    },
    updatedNote: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map(note => {
        if (note.id === action.payload.id) {
          return action.payload
        }
        return note
      })
      state.active = action.payload
      state.messageSaved = `${action.payload.title}, Updated Succesfully ✨`
    },
    setPhotosToActiveNote: (state, action) => {
      state.active = state.active
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      state.isSaving = false
    },

    clearNotesLogout: state => {
      state.isSaving = false
      state.messageSave = ''
      state.notes = []
      state.active = null
    },
    deleteNoteById: (state, action) => {
      state.active = null
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
  },
})
export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updatedNote,
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNoteById,
} = journalSlice.actions
