import { useEffect, useState } from "react"
import API from "../services/api"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  })

  const fetchEmployees = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await API.get("/employees")
      setEmployees(res.data)
    } catch {
      setError("Failed to load employees")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const submit = async () => {
    if (!form.employeeId || !form.fullName || !form.email || !form.department) {
      setError("Please fill in all fields")
      return
    }
    try {
      await API.post("/employees", form)
      setForm({ employeeId: "", fullName: "", email: "", department: "" })
      fetchEmployees()
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to add employee")
    }
  }

  const remove = async (id) => {
    try {
      await API.delete(`/employees/${id}`)
      fetchEmployees()
    } catch {
      setError("Failed to delete employee")
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Employees</h2>

      {error && (
        <div className="mb-4 text-red-600 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-4 gap-2 mb-6">
        <input className="border p-2" placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
        />
        <input className="border p-2" placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <input className="border p-2" placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input className="border p-2" placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <button
          onClick={submit}
          className="col-span-4 bg-black text-white py-2 cursor-pointer"
        >
          Add Employee
        </button>
      </div>

      {loading && (
        <p className="text-sm text-gray-500">Loading employees...</p>
      )}

      {!loading && employees.length === 0 && (
        <p className="text-sm text-gray-500">
          No employees added yet.
        </p>
      )}

      {!loading && employees.length > 0 && (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Dept</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.employeeId} className="border-t text-center">
                <td className="p-2">{e.employeeId}</td>
                <td>{e.fullName}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>
                  <button
                    onClick={() => remove(e.employeeId)}
                    className="text-red-600 cursor-pointer hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
