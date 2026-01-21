import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "teacher") {
        window.location.href = "/teacher";
      } else {
        window.location.href = "/student";
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-50 to-green-200">
      <div
        className="
          bg-white w-full max-w-md
          p-8 rounded-2xl shadow-2xl
          border border-green-200
        "
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-green-800">
            CSE-INCEPTRON
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            AI-Powered Classroom Assistant
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-green-800 mb-1">
              Email
            </label>
            <input
              type="email"
              className="
                w-full border border-green-300 rounded-xl
                px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-800 mb-1">
              Password
            </label>
            <input
              type="password"
              className="
                w-full border border-green-300 rounded-xl
                px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={login}
            className="
              w-full mt-4
              bg-gradient-to-r from-green-700 to-emerald-600
              text-white font-semibold py-3 rounded-xl
              hover:from-green-800 hover:to-emerald-700
              hover:shadow-xl hover:scale-[1.02]
              transition-all duration-300
            "
          >
            🔐 Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 CSE-INCEPTRON • Secure Academic Access
        </p>
      </div>
    </div>
  );
}
