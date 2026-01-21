import { useState } from "react";
import api from "../api/axios";

export default function StudentChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = async () => {
    if (!question) return alert("Enter a question");

    const res = await api.post("/chat/ask", {
      classId: "PASTE_CLASS_ID",
      subjectName: "operating systems",
      question
    });

    setAnswer(res.data.answer);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-green-800">
          Student Chatbot
        </h2>
        <p className="text-gray-600 mt-1">
          Ask questions strictly based on your uploaded syllabus
        </p>
      </div>

      {/* Chat Box */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        
        {/* Question Input */}
        <div>
          <label className="block font-semibold text-green-800 mb-1">
            Your Question
          </label>
          <textarea
            className="
              w-full border border-green-300 rounded-xl
              p-4 min-h-[120px]
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
            placeholder="Type your question here..."
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Ask Button */}
        <button
          onClick={ask}
          className="
            bg-gradient-to-r from-green-700 to-emerald-600
            text-white font-semibold px-8 py-3 rounded-xl
            hover:from-green-800 hover:to-emerald-700
            hover:shadow-xl hover:scale-[1.02]
            transition-all duration-300
          "
        >
          🤖 Ask AI
        </button>
      </div>

      {/* Answer Section */}
      {answer && (
        <div
          className="
            bg-yellow-50 border border-yellow-200
            p-6 rounded-2xl shadow
          "
        >
          <h3 className="font-semibold text-green-800 mb-2">
            AI Answer
          </h3>
          <p className="text-gray-800 whitespace-pre-line">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
