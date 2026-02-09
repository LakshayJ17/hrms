import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-6 px-6 py-4 border-b">
      <h1 className="font-semibold text-lg">HRMS</h1>

      <div className="space-x-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm ${isActive ? "text-blue-700 font-semibold" : "text-gray-700"}`
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `text-sm ${isActive ? "text-blue-700 font-semibold" : "text-gray-700"}`
          }
        >
          Attendance
        </NavLink>
      </div>
    </nav>
  );
}
