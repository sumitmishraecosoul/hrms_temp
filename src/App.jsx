import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './hooks/useAuth.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
