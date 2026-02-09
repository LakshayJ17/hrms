import { useEffect, useState } from "react";
import API from "../services/api";

const formatDateOnly = (value) => {
  if (!value) return "";
  const raw = String(value).split("T")[0];
  const parts = raw.split("-");
  if (parts.length !== 3) return value;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
};

export default function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });

  // Load employees on page load
  useEffect(() => {
    API.get("/employees/").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const load = async (id) => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const res = await API.get(`/attendance/${id}`);
      setRecords(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  const mark = async () => {
    if (!form.employeeId || !form.date) {
      setError("Select an employee and date first");
      return;
    }
    try {
      await API.post("/attendance/", form);
      load(form.employeeId);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to mark attendance");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Attendance</h2>

      <div className="flex gap-2 mb-4">
        <select
          className="border p-2"
          value={form.employeeId}
          onChange={(e) => {
            const id = e.target.value;
            setForm({ ...form, employeeId: id });
            if (!id) {
              setRecords([]);
              return;
            }
            load(id);
          }}
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e.employeeId} value={e.employeeId}>
              {e.employeeId} - {e.fullName}
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

      {loading && (
        <p className="text-sm text-gray-500">Loading attendance...</p>
      )}

      {!loading && !form.employeeId && (
        <p className="text-sm text-gray-500">
          Please select an employee to view and mark attendance.
        </p>
      )}

      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
      
      {!loading && records.length === 0 && form.employeeId && (
        <p className="text-sm text-gray-500">No attendance records found.</p>
      )}

      {!loading && records.length > 0 && (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={`${r.employeeId}-${r.date}-${i}`} className="border-t">
                <td className="p-2">{formatDateOnly(r.date)}</td>
                <td className="p-2">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
