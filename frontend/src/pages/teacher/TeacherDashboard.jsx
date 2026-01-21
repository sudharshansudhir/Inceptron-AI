import { Link } from "react-router-dom";

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-green-800">
          Teacher Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          Manage your classes, students, and learning materials
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Manage Classes */}
        <Link
          to="/teacher/classes"
          className="
            bg-gradient-to-br from-green-700 to-emerald-600
            text-white p-6 rounded-2xl shadow-lg
            hover:shadow-2xl hover:-translate-y-1
            transition-all duration-300
          "
        >
          <h3 className="text-xl font-bold mb-2">🏫 Manage Classes</h3>
          <p className="text-sm text-green-100">
            Create and organize your class groups
          </p>
        </Link>

        {/* Manage Students */}
        <Link
          to="/teacher/students"
          className="
            bg-gradient-to-br from-yellow-400 to-yellow-300
            text-green-900 p-6 rounded-2xl shadow-lg
            hover:shadow-2xl hover:-translate-y-1
            transition-all duration-300
          "
        >
          <h3 className="text-xl font-bold mb-2">👥 Manage Students</h3>
          <p className="text-sm">
            Add or manage students in your classes
          </p>
        </Link>

        {/* Upload Documents */}
        <Link
          to="/teacher/upload"
          className="
            bg-white border border-green-200
            text-green-800 p-6 rounded-2xl shadow-lg
            hover:bg-green-50 hover:shadow-2xl hover:-translate-y-1
            transition-all duration-300
          "
        >
          <h3 className="text-xl font-bold mb-2">📄 Upload Documents</h3>
          <p className="text-sm text-gray-600">
            Upload syllabus documents for AI indexing
          </p>
        </Link>

      </div>
    </div>
  );
}
