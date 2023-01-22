import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { checkingAuth, startGoogleSignIn, startSignInWithEmailPassword } from '@/store/auth/'
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from 'react-hook-form'

const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  })

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = data => {
    dispatch(startSignInWithEmailPassword(data))
  }

  const onGoogleSignIn = e => {
    e.preventDefault()
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
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
                  message: 'Password is not valid.',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} variant="contained" fullWidth type="submit">
                <Typography sx={{ ml: 1 }}>Login</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              {' '}
              Create an account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
