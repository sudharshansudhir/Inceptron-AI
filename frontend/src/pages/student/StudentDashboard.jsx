import { useEffect, useState } from "react";
import api from "../../api/axios";
import SubjectCard from "../../components/SubjectCard";

export default function StudentDashboard() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/student/classes") // student is auto-filtered by backend
      .then((res) => setClasses(res.data))
      .catch(() => alert("Unable to load subjects"));
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-green-800">
          My Subjects
        </h2>
        <p className="text-gray-600 mt-1">
          Select a subject to start learning with your AI assistant
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          className="
            w-full md:w-1/2
            border border-green-300 rounded-xl
            px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-green-500
            transition-all
          "
          placeholder="🔍 Search subject..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Subjects Grid */}
      {classes.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl text-yellow-800">
          No subjects assigned yet. Please contact your teacher.
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) =>
            cls.subjects
              .filter((s) =>
                s.subjectName.toLowerCase().includes(search.toLowerCase())
              )
              .map((subject) => (
                <SubjectCard
                  key={subject.vectorNamespace}
                  classId={cls._id}
                  className={cls.className}
                  subject={subject}
                />
              ))
          )}
        </div>
      )}
    </div>
  );
}
