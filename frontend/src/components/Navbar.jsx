import { logout } from "../utils/auth";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-green-700 to-emerald-600 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      
      {/* Logo / Title */}
      <h1 className="text-xl md:text-2xl font-bold tracking-wide">
        INCEPTRON-AI
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="bg-yellow-400 text-green-900 font-semibold px-5 py-2 rounded-lg shadow-md 
                     hover:bg-yellow-300 hover:shadow-lg hover:scale-105
                     transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
