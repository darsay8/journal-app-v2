import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { checkingAuth, startGoogleSignIn } from '@/store/auth/'
import { useForm } from '@/hooks'
import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'

export const LoginPage = () => {
  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm({
    email: 'user@mail.com',
    password: '123456',
  })

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = e => {
    e.preventDefault()
    // console.log('login')
    dispatch(checkingAuth())
  }

  const onGoogleSignIn = e => {
    e.preventDefault()
    // console.log('google')
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="name@mail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="******"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
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
