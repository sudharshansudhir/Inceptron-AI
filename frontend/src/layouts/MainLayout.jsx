import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
