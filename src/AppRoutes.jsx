import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import PathSelect from './Pages/PathSelect'
import ThriveBrandsDashboard from './Pages/ThriveBrandsDashboard'
import ThriveEmployee from './Pages/ThriveEmployee'
import ThriveAttendance from './Pages/ThriveAttendance'
import EcoSoulDashboard from './Pages/EcoSoulDashboard'
import EcoSoulEmployee from './Pages/EcoSoulEmployee'
import EcoSoulAttendance from './Pages/EcoSoulAttendance'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/path-select" element={<PathSelect />} />
      <Route path="/thrive-brands" element={<ThriveBrandsDashboard />} />
      <Route path="/thrive-brands/employee" element={<ThriveEmployee />} />
      <Route path="/thrive-brands/attendance" element={<ThriveAttendance />} />
      <Route path="/ecosoul" element={<EcoSoulDashboard />} />
      <Route path="/ecosoul/employee" element={<EcoSoulEmployee />} />
      <Route path="/ecosoul/attendance" element={<EcoSoulAttendance />} />
    </Routes>
  )
}

export default AppRoutes
