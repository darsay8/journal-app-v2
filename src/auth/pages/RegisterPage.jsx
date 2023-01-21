import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { startRegisterUserWithEmailPassword } from '@/store/auth'

const formData = {
  email: '',
  password: '',
  displayName: '',
}

export const RegisterPage = () => {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  })

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = data => {
    dispatch(startRegisterUserWithEmailPassword(data))
  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="name"
              fullWidth
              {...register('displayName', {
                required: 'Name is Required.',
                minLength: { value: 3, message: 'Name min length is 3.' },
              })}
              error={!!errors.displayName}
              helperText={errors.displayName?.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="name@mail.com"
              fullWidth
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Must be a valid email address.',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="******"
              fullWidth
              {...register('password', {
                required: 'Password is Required.',
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/,
                  message:
                    'Password min length is 6 to 10 and should contain one Capital Letter, one Small Letter, and one Number.',
                },
              })}
              error={!!errors.password}
              helperText={
                errors.password
                  ? errors.password?.message
                  : 'Password min length is 6 to 10 and should contain one Capital Letter, one Small Letter, and one Number.'
              }
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                <Typography sx={{ ml: 1 }}>Register</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              {' '}
              Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
