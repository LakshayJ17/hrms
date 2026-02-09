import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-6 px-6 py-4 border-b">
      <h1 className="font-semibold text-lg">HRMS</h1>

      <Link to={"/"}
        className="text-sm hover:underline"
      >
        Employees
      </Link>

      <Link to={"/attendance"}
        className="text-sm hover:underline"
      >
        Attendance
      </Link>
    </nav>
  )
}
