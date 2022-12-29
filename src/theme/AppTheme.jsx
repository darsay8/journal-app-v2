import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { purpleTheme } from './theme'

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
