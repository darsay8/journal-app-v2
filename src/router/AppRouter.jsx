import { AuthRoutes } from '@/auth/routes/AuthRoutes'
import { JournalRoutes } from '@/journal/routes/JournalRoutes'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  )
}
export default AppRouter
