import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentChat from "./pages/student/StudentChat";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ManageClasses from "./pages/teacher/ManageClasses";
import ManageStudents from "./pages/teacher/ManageStudents";
import UploadDocument from "./pages/teacher/UploadDocument";

const Protected = ({ role, children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;
  if (role && userRole !== role) return <Navigate to="/" />;

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          {/* STUDENT */}
          <Route
            path="/student"
            element={
              <Protected role="student">
                <StudentDashboard />
              </Protected>
            }
          />
          <Route
            path="/student/chat/:classId/:subjectName"
            element={
              <Protected role="student">
                <StudentChat />
              </Protected>
            }
          />

          {/* TEACHER */}
          <Route
            path="/teacher"
            element={
              <Protected role="teacher">
                <TeacherDashboard />
              </Protected>
            }
          />
          <Route
            path="/teacher/classes"
            element={
              <Protected role="teacher">
                <ManageClasses />
              </Protected>
            }
          />
          <Route
            path="/teacher/students"
            element={
              <Protected role="teacher">
                <ManageStudents />
              </Protected>
            }
          />
          <Route
            path="/teacher/upload"
            element={
              <Protected role="teacher">
                <UploadDocument />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
