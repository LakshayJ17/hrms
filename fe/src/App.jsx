import './App.css'
import {Routes, Route} from "react-router-dom"
import EmployeesPage from './pages/employees-page'
import AttendancePage from './pages/attendance-page'
import Navbar from './components/navbar'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<EmployeesPage />} />
      <Route path='/attendance' element={<AttendancePage />} />
    </Routes>
    </>
  )
}

export default App
