import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function UploadDocument() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    api.get("/teacher/classes")
      .then(res => setClasses(res.data))
      .catch(() => alert("Failed to load classes"));
  }, []);

  const upload = async () => {
    if (!selectedClass || !subjectName || !file) {
      return alert("All fields required");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(
        `/document/upload/${selectedClass._id}/${subjectName}`,
        formData
      );
      alert("Document uploaded successfully");
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  }; 

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-green-800">
          Upload Learning Document
        </h2>
        <p className="text-gray-600 mt-1">
          Upload DOCX files to make them available for AI-powered student queries
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-white p-8 rounded-2xl shadow space-y-6">
        
        {/* Step 1: Class Select */}
        <div>
          <label className="block font-semibold text-green-800 mb-1">
            1️⃣ Select Class
          </label>
          <select
            className="
              w-full border border-green-300 rounded-xl
              px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
            onChange={(e) => {
              const cls = classes.find(c => c._id === e.target.value);
              setSelectedClass(cls);
              setSubjectName("");
            }}
          >
            <option value="">Choose a class</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>
                {c.className}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Subject Select */}
        {selectedClass && (
          <div>
            <label className="block font-semibold text-green-800 mb-1">
              2️⃣ Select Subject
            </label>
            <select
              className="
                w-full border border-green-300 rounded-xl
                px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
              onChange={(e) => setSubjectName(e.target.value)}
            >
              <option value="">Choose subject</option>
              {selectedClass.subjects.map(s => (
                <option key={s.vectorNamespace} value={s.subjectName}>
                  {s.subjectName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 3: File Upload */}
        <div>
          <label className="block font-semibold text-green-800 mb-1">
            3️⃣ Upload DOCX File
          </label>

          <div
            className="
              border-2 border-dashed border-green-300 rounded-xl
              p-6 text-center
              hover:border-green-500 transition
            "
          >
            <input
              type="file"
              accept=".docx"
              className="w-full"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p className="text-sm text-gray-500 mt-2">
              Only .docx files are supported
            </p>
          </div>

          {file && (
            <p className="text-sm text-green-700 mt-2">
              Selected file: <strong>{file.name}</strong>
            </p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={upload}
          className="
            w-full bg-gradient-to-r from-green-700 to-emerald-600
            text-white font-semibold py-3 rounded-xl
            hover:from-green-800 hover:to-emerald-700
            hover:shadow-xl hover:scale-[1.02]
            transition-all duration-300
          "
        >
          🚀 Upload & Index Document
        </button>
      </div>
    </div>
  );
}
