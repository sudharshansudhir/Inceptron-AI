import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ClassDetails() {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  const fetchClass = async () => {
    const res = await api.get("/teacher/classes");
    setClassData(res.data.find((c) => c._id === classId));
  };

  const addStudent = async () => {
    if (!email) return alert("Enter student email");
    await api.post(`/teacher/class/${classId}/student`, { email });
    setEmail("");
    fetchClass();
  };

  const addSubject = async () => {
    if (!subject) return alert("Enter subject name");
    await api.post(`/teacher/class/${classId}/subject`, {
      subjectName: subject
    });
    setSubject("");
    fetchClass();
  };

  useEffect(() => {
    fetchClass();
  }, []);

  if (!classData) {
    return (
      <div className="text-center text-green-700 font-semibold">
        Loading class details...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Class Header */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold tracking-wide">
          {classData.className}
        </h2>
        <p className="text-sm text-green-100 mt-1">
          Manage students, subjects, and documents
        </p>
      </div>

      {/* Add Student */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold text-green-800 mb-3">
          ➕ Add Student
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="
              flex-1 border border-green-300 rounded-xl
              px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500
            "
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={addStudent}
            className="
              bg-yellow-400 text-green-900 font-semibold
              px-6 py-2 rounded-xl
              hover:bg-yellow-300 hover:shadow-lg
              transition-all
            "
          >
            Add
          </button>
        </div>
      </div>

      {/* Add Subject */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold text-green-800 mb-3">
          ➕ Add Subject
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="
              flex-1 border border-green-300 rounded-xl
              px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500
            "
            placeholder="Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button
            onClick={addSubject}
            className="
              bg-yellow-400 text-green-900 font-semibold
              px-6 py-2 rounded-xl
              hover:bg-yellow-300 hover:shadow-lg
              transition-all
            "
          >
            Add
          </button>
        </div>
      </div>

      {/* Subjects List */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold text-green-800 mb-4">
          📚 Subjects
        </h3>

        {classData.subjects.length === 0 ? (
          <div className="text-yellow-700 bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
            No subjects added yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {classData.subjects.map((s) => (
              <li
                key={s.vectorNamespace}
                className="
                  flex items-center justify-between
                  border border-green-200 rounded-xl
                  p-4 hover:shadow-md transition
                "
              >
                <span className="font-medium text-green-800">
                  {s.subjectName}
                </span>

                <Link
                  to={`/teacher/class/${classId}/upload/${s.subjectName}`}
                  className="
                    text-sm bg-green-700 text-white
                    px-4 py-1.5 rounded-lg
                    hover:bg-green-800 hover:shadow
                    transition
                  "
                >
                  Upload DOCX
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
