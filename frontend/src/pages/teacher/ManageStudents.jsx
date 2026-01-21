import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ManageStudents() {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const loadClasses = async () => {
    try {
      const res = await api.get("/teacher/classes");
      setClasses(res.data);
    } catch {
      alert("Failed to load classes");
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const addStudent = async () => {
    if (!email || !selectedClassId) {
      return alert("Select class and enter student email");
    }

    try {
      await api.post(`/teacher/class/${selectedClassId}/student`, {
        email: email.trim()
      });
      alert("Student added successfully");
      setEmail("");
      loadClasses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add student");
    }
  };

  const removeStudent = async (studentId) => {
    if (!window.confirm("Remove this student from class?")) return;

    try {
      await api.delete(
        `/teacher/class/${selectedClassId}/student/${studentId}`
      );
      alert("Student removed");
      loadClasses();
    } catch {
      alert("Failed to remove student");
    }
  };

  const selectedClass = classes.find(c => c._id === selectedClassId);
  const students =
    selectedClass?.students.filter(
      s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-green-800">
          Manage Students
        </h2>
        <p className="text-gray-600 mt-1">
          Add, view, and remove students class-wise
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        {/* Class Select */}
        <select
          className="
            w-full border border-green-300 rounded-xl
            px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-green-500
          "
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map(c => (
            <option key={c._id} value={c._id}>
              {c.className}
            </option>
          ))}
        </select>

        {/* Add Student */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="
              flex-1 border border-green-300 rounded-xl
              px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={addStudent}
            className="
              bg-gradient-to-r from-green-700 to-emerald-600
              text-white font-semibold px-6 py-2 rounded-xl
              hover:from-green-800 hover:to-emerald-700
              hover:shadow-lg hover:scale-105
              transition-all duration-300
            "
          >
            Add Student
          </button>
        </div>
      </div>

      {/* Student List */}
      {selectedClass && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
            <h3 className="text-xl font-semibold text-green-800">
              Students in {selectedClass.className}
            </h3>

            <input
              className="
                border border-green-300 rounded-xl
                px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {students.length === 0 ? (
            <div className="text-gray-500">
              No students found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-green-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Name</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s._id} className="hover:bg-yellow-50">
                      <td className="border px-4 py-2">{s.name}</td>
                      <td className="border px-4 py-2">{s.email}</td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          onClick={() => removeStudent(s._id)}
                          className="
                            bg-red-500 text-white px-3 py-1 rounded-lg
                            hover:bg-red-600 transition
                          "
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
