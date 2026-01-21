import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

export default function StudentChat() {
  const { classId, subjectName } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = async () => {
    if (!question) return alert("Enter a question");

    const res = await api.post("/chat/ask", {
      classId,
      subjectName,
      question
    });

    setAnswer(res.data.answer);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      
      {/* Header */}
      <h2 className="text-2xl font-bold text-green-800 mb-1">
        {subjectName} Assistant
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Ask questions strictly from your syllabus
      </p>

      {/* Question Box */}
      <label className="block text-sm font-semibold text-green-700 mb-2">
        Your Question
      </label>
      <textarea
        className="
          w-full border border-green-300 rounded-xl p-4
          focus:outline-none focus:ring-2 focus:ring-green-500
          resize-none
        "
        rows={4}
        placeholder="Type your question here..."
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Ask Button */}
      <button
        onClick={ask}
        className="
          mt-4 bg-gradient-to-r from-green-700 to-emerald-600
          text-white font-semibold px-6 py-2 rounded-xl
          hover:from-green-800 hover:to-emerald-700
          hover:shadow-lg hover:scale-105
          transition-all duration-300
        "
      >
        Ask Question
      </button>

      {/* Answer Box */}
      {answer && (
        <div className="mt-6 bg-gradient-to-br from-green-50 to-yellow-50 border border-green-200 p-5 rounded-xl shadow-inner">
          <strong className="text-green-800">Answer</strong>
          <p className="mt-3 text-gray-700 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
