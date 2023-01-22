import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ImageGallery } from '../components'
import { setActiveNote, startSaveNote } from '@/store/journal'
import Swal from 'sweetalert2'
import '@sweetalert2/theme-material-ui/material-ui.css'

export const NoteView = () => {
  const { active: activeNote, messageSaved, isSaving } = useSelector(state => state.journal)
  const dispatch = useDispatch()

  const dateString = useMemo(() => {
    const newDate = new Date(activeNote.date)
    return newDate.toUTCString()
  }, [activeNote.date])

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
  } = useForm({
    defaultValues: activeNote,
  })

  const watchNote = watch(['title', 'body'])
  const activeNoteValues = getValues()

  useEffect(() => {
    reset(activeNote)
  }, [activeNote])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Note Updated ', messageSaved, 'success')
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNote(activeNoteValues))
    if (messageSaved.length > 0) {
      Swal.fire('Note Updated ', messageSaved, 'success')
    }
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }} onClick={onSaveNote} disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} /> Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          sx={{ border: 'none', mb: 1 }}
          {...register('title')}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          {...register('body')}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  )
}
