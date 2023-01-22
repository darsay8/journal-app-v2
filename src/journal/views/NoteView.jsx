import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ImageGallery } from '../components'

export const NoteView = () => {
  const { active: activeNote } = useSelector(state => state.journal)
  // console.log(activeNote)

  const dateString = useMemo(() => {
    const newDate = new Date(activeNote.date)
    return newDate.toUTCString()
  }, [activeNote.date])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    let defaultValues = {}
    defaultValues.title = activeNote.title
    defaultValues.body = activeNote.body
    reset({ ...defaultValues })
  }, [activeNote])

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
        <Button color="primary" sx={{ padding: 2 }}>
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
