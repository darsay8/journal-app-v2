import { createSlice } from '@reduxjs/toolkit'
export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: true,
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
    addNewEmptyNote: (state, action) => {},
    setActiveNote: (state, action) => {},
    setNotes: (state, active) => {},
    setSaving: state => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {},
  },
})
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } =
  journalSlice.actions
