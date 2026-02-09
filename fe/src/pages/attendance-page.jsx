import { useEffect, useState } from "react"
import API from "../services/api"

export default function AttendancePage() {
  const [employees, setEmployees] = useState([])
  const [records, setRecords] = useState([])
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  })

  useEffect(() => {
    API.get("/employees/").then((res) => {
      setEmployees(res.data)
      if (res.data?.length) {
        setSelectedEmployeeId(res.data[0].employeeId)
      }
    })
  }, [])

  useEffect(() => {
    if (!selectedEmployeeId) return
    setForm((prev) => ({ ...prev, employeeId: selectedEmployeeId }))
    load(selectedEmployeeId)
  }, [selectedEmployeeId])

  const load = async (id) => {
    if (!id) return
    setLoading(true)
    setError("")
    try {
      const res = await API.get(`/attendance/${id}`)
      setRecords(res.data)
    } catch {
      setError("Failed to load attendance")
    } finally {
      setLoading(false)
    }
  }

  const mark = async () => {
    if (!form.employeeId || !form.date) {
      setError("Select an employee and date first")
      return
    }
    try {
      await API.post("/attendance/", form)
      load(form.employeeId)
    } catch {
      setError("Failed to mark attendance")
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Attendance</h2>

      {error && (
        <div className="mb-4 text-red-600 text-sm">{error}</div>
      )}

      <div className="flex gap-2 mb-4">
        <select
          className="border p-2"
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e.employeeId} value={e.employeeId}>
              {e.fullName}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <select
          className="border p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button onClick={mark} className="bg-black text-white px-4">
          Mark
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading attendance...</p>}

      {!loading && records.length === 0 && form.employeeId && (
        <p className="text-sm text-gray-500">
          No attendance records found.
        </p>
      )}

      {!loading && records.length > 0 && (
        <ul className="text-sm">
          {records.map((r, i) => (
            <li key={`${r.employeeId}-${r.date}-${i}`}>
              {r.date} — {r.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
