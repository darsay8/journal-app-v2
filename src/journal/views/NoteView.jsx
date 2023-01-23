import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ImageGallery } from '../components'
import { setActiveNote, startDeleteNote, startSaveNote, startUploadingFiles } from '@/store/journal'
import Swal from 'sweetalert2'
import '@sweetalert2/theme-material-ui/material-ui.css'

export const NoteView = () => {
  const { active: activeNote, messageSaved, isSaving } = useSelector(state => state.journal)
  const dispatch = useDispatch()
  const fileInputRef = useRef()

  const dateString = useMemo(() => {
    const newDate = new Date(activeNote.date)
    return newDate.toUTCString().slice(0, 16)
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
  }

  const onDelete = () => {
    dispatch(startDeleteNote())
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return
    dispatch(startUploadingFiles(target.files, activeNoteValues))
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
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />
        <IconButton
          color="primary"
          disabled={isSaving || activeNote.title === ''}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button color="primary" onClick={onSaveNote} disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30 }} />
        </Button>
        <Button onClick={onDelete} color="error">
          <DeleteOutline />
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
      {/* <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
        </Button>
      </Grid> */}
      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  )
}
