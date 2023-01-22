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
    },
    setNotes: (state, active) => {},
    setSaving: state => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {},
  },
})
export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
} = journalSlice.actions
