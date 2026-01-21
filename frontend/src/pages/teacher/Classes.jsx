import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");

  const fetchClasses = async () => {
    const res = await api.get("/teacher/classes");
    setClasses(res.data);
  };

  const createClass = async () => {
    if (!className) return alert("Enter class name");
    await api.post("/teacher/class", { className });
    setClassName("");
    fetchClasses();
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-green-800">
          My Classes
        </h2>
        <p className="text-gray-600 mt-1">
          Create and manage your class groups
        </p>
      </div>

      {/* Create Class */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold text-green-800 mb-3">
          ➕ Create New Class
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="
              flex-1 border border-green-300 rounded-xl
              px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500
            "
            placeholder="Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <button
            onClick={createClass}
            className="
              bg-gradient-to-r from-green-700 to-emerald-600
              text-white font-semibold px-6 py-2 rounded-xl
              hover:from-green-800 hover:to-emerald-700
              hover:shadow-lg hover:scale-105
              transition-all duration-300
            "
          >
            Create
          </button>
        </div>
      </div>

      {/* Classes List */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold text-green-800 mb-4">
          📚 Your Classes
        </h3>

        {classes.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-yellow-800">
            No classes created yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {classes.map((c) => (
              <li
                key={c._id}
                className="
                  flex items-center justify-between
                  border border-green-200 rounded-xl
                  p-4 hover:shadow-md transition
                "
              >
                <span className="font-medium text-green-800">
                  {c.className}
                </span>

                <Link
                  to={`/teacher/class/${c._id}`}
                  className="
                    text-sm bg-yellow-400 text-green-900 font-semibold
                    px-4 py-1.5 rounded-lg
                    hover:bg-yellow-300 hover:shadow
                    transition
                  "
                >
                  Manage →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
