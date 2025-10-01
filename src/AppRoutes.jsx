import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import PathSelect from './Pages/PathSelect'
import ThriveBrandsDashboard from './Pages/ThriveBrandsDashboard'
import ThriveEmployee from './Pages/ThriveEmployee'
import ThriveAttendance from './Pages/ThriveAttendance'
import EcoSoulDashboard from './Pages/EcoSoulDashboard'
import EcoSoulEmployee from './Pages/EcoSoulEmployee'
import EcoSoulAttendance from './Pages/EcoSoulAttendance'
import ProtectedRoute from './Components/ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/path-select" element={
        <ProtectedRoute>
          <PathSelect />
        </ProtectedRoute>
      } />
      <Route path="/thrive-brands" element={
        <ProtectedRoute>
          <ThriveBrandsDashboard />
        </ProtectedRoute>
      } />
      <Route path="/thrive-brands/employee" element={
        <ProtectedRoute>
          <ThriveEmployee />
        </ProtectedRoute>
      } />
      <Route path="/thrive-brands/attendance" element={
        <ProtectedRoute>
          <ThriveAttendance />
        </ProtectedRoute>
      } />
      <Route path="/ecosoul" element={
        <ProtectedRoute>
          <EcoSoulDashboard />
        </ProtectedRoute>
      } />
      <Route path="/ecosoul/employee" element={
        <ProtectedRoute>
          <EcoSoulEmployee />
        </ProtectedRoute>
      } />
      <Route path="/ecosoul/attendance" element={
        <ProtectedRoute>
          <EcoSoulAttendance />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default AppRoutes
