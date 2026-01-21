import { Link } from "react-router-dom";

export default function SubjectCard({ classId, className, subject }) {
  return (
    <Link
      to={`/student/chat/${classId}/${subject.subjectName}`}
      className="
        group
        bg-gradient-to-br from-green-50 to-yellow-50
        border border-green-200
        p-5 rounded-xl shadow-sm
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
        flex flex-col justify-between
      "
    >
      {/* Subject Name */}
      <h3 className="text-lg font-bold text-green-800 group-hover:text-green-900 transition-colors">
        {subject.subjectName}
      </h3>

      {/* Class Name */}
      <p className="mt-2 text-sm text-gray-600">
        {className}
      </p>

      {/* Footer hint */}
      <div className="mt-4 text-xs text-green-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Click to open chatbot →
      </div>
    </Link>
  );
}
