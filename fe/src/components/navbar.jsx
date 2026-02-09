import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex flex-col gap-4 px-6 py-4 border-b md:flex-row md:items-center md:justify-between">
      <h1 className="font-semibold text-lg">HRMS</h1>

      <div className="flex gap-6 md:gap-10">
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
