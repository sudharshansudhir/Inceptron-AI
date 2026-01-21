import { Outlet, Link } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-800 to-emerald-700 text-white p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-6 tracking-wide text-yellow-300">
          Student Panel
        </h2>

        <nav className="flex flex-col gap-3">
          <Link
            to="/student"
            className="px-4 py-2 rounded-lg hover:bg-green-700 hover:text-yellow-300 transition-all duration-300"
          >
            📚 Dashboard
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="mt-6 px-4 py-2 rounded-lg bg-yellow-400 text-green-900 font-semibold
                       hover:bg-yellow-300 hover:shadow-lg transition-all duration-300"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
