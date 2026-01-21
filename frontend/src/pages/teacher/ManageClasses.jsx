import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ManageClasses() {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const loadClasses = async () => {
    const res = await api.get("/teacher/classes");
    setClasses(res.data);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const createClass = async () => {
    if (!className) return alert("Enter class name");

    await api.post("/teacher/class", { className });
    alert("Class created");
    setClassName("");
    loadClasses();
  };

  const addSubject = async (classId) => {
    if (!subjectName) return alert("Enter subject name");

    await api.post(`/teacher/class/${classId}/subject`, {
      subjectName
    });

    alert("Subject added");
    setSubjectName("");
    loadClasses();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-green-800">
          Manage Classes
        </h2>
        <p className="text-gray-600 mt-1">
          Create classes and manage subjects for each class
        </p>
      </div>

      {/* CREATE CLASS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold text-green-800 mb-3">
          ➕ Create New Class
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="
              flex-1 border border-green-300 rounded-xl
              px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
            placeholder="Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <button
            className="
              bg-gradient-to-r from-green-700 to-emerald-600
              text-white font-semibold px-6 py-2 rounded-xl
              hover:from-green-800 hover:to-emerald-700
              hover:shadow-lg hover:scale-105
              transition-all duration-300
            "
            onClick={createClass}
          >
            Create Class
          </button>
        </div>
      </div>

      {/* CLASS LIST */}
      <div className="space-y-6">
        {classes.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl text-yellow-800">
            No classes created yet.
          </div>
        ) : (
          classes.map((cls) => (
            <div
              key={cls._id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              {/* Class Name */}
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                {cls.className}
              </h3>

              {/* SUBJECT LIST */}
              <div className="mb-4">
                <h4 className="font-medium text-green-700 mb-2">
                  Subjects
                </h4>

                {cls.subjects.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No subjects added yet
                  </p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {cls.subjects.map((s) => (
                      <li
                        key={s.vectorNamespace}
                        className="
                          bg-green-100 text-green-800
                          px-3 py-1 rounded-full text-sm
                        "
                      >
                        {s.subjectName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ADD SUBJECT */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  className="
                    flex-1 border border-green-300 rounded-xl
                    px-4 py-2
                    focus:outline-none focus:ring-2 focus:ring-green-500
                  "
                  placeholder="New Subject Name"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                />
                <button
                  className="
                    bg-yellow-400 text-green-900 font-semibold
                    px-6 py-2 rounded-xl
                    hover:bg-yellow-300 hover:shadow-lg
                    transition-all duration-300
                  "
                  onClick={() => addSubject(cls._id)}
                >
                  Add Subject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
