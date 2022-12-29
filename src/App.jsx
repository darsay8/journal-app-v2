import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import { AppTheme } from './theme'

const App = () => {
  return (
    <BrowserRouter>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </BrowserRouter>
  )
}
export default App
