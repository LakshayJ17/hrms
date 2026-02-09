import './App.css'
import {Routes, Route} from "react-router-dom"
import EmployeesPage from './pages/employees-page'
import AttendancePage from './pages/attendance-page'

function App() {

  return (
    <Routes>
      <Route path='/' element={<EmployeesPage />} />
      <Route path='/attendance' element={<AttendancePage />} />
    </Routes>
  )
}

export default App
