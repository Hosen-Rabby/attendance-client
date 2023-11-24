import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import {
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminDashPage from "./pages/AdminDashPage";
import AddTeacherPage from "./pages/AddTeacherPage";
import AddDeptPage from "./pages/AddDeptPage";
import AdminDash from "./components/Dashboard/AdminDash";
import AddPage from "./pages/AddPage";
import Students from "./components/Students/Students";
import Loading from "./utils/Loading";
import ArrayA from "./components/Students/ArrayA";
import TeacherDashboardPage from "./pages/TeacherDashboardPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import NavBar from "./components/Navbar/NavBar";
import AttendStudentsPage from "./pages/AttendStudentsPage";
import Sidebar from "./components/Sidebar/Sidebar";
import TeachersPage from "./pages/TeachersPage";
import StudentsPage from "./pages/StudentsPage";
import AnnouncementPage from "./pages/AnnouncementPage";
import RoutinePage from "./pages/RoutinePage";
import AttendanceTakingPage from "./pages/AttendanceTakingPage";
import AttendStudent from "./components/AttendStudent/AttendStudent";
import ViewAttendance from "./components/View/ViewAttendance";
import ViewPage from "./pages/ViewPage";
import AddStudent from "./components/Add/AddStudent";
import AddCourses from "./components/Add/AddCourses";
import AddBatch from "./components/Add/AddBatch";
import BatchPage from "./pages/BatchPage";
import CoursePage from "./pages/CoursePage";
import IncludePage from "./pages/IncludePage";

function App() {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <HomePage />,
    // },
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/registration",
      element: <RegistrationPage />,
    },

    {
      path: "/admin/add",
      element: <AddPage />,
    },
    {
      path: "/students",
      element: (
        <PrivateRoute>
          <StudentsPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/loading",
      element: (
        <PrivateRoute>
          <Loading />
        </PrivateRoute>
      ),
    },
    {
      path: "/a",
      element: (
        <PrivateRoute>
          <AttendStudent />
        </PrivateRoute>
      ),
    },
    {
      path: "/announcements",
      element: (
        <PrivateRoute>
          <AnnouncementPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/routine",
      element: (
        <PrivateRoute>
          <RoutinePage />
        </PrivateRoute>
      ),
    },
    {
      path: "/attendance",
      element: (
        <PrivateRoute>
          {" "}
          <AttendanceTakingPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/view",
      element: (
        <PrivateRoute>
          <ViewPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/addstudent",
      element: (
        <PrivateRoute>
          <AddStudent />
        </PrivateRoute>
      ),
    },
    {
      path: "/course",
      element: (
        <PrivateRoute>
          {" "}
          <CoursePage />
        </PrivateRoute>
      ),
    },
    {
      path: "/batch",
      element: (
        <PrivateRoute>
          <BatchPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/include",
      element: (
        <PrivateRoute>
          <IncludePage />
        </PrivateRoute>
      ),
    },
    {
      path: "/t/attends",
      element: <AttendStudentsPage />,
    },
    // {
    //   path: "/sidebar",
    //   element: <Sidebar />,
    // },
    {
      path: "/teachers",
      element: (
        <PrivateRoute>
          <TeachersPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <AdminDashPage />
        </PrivateRoute>
      ),
    },
  ]);
  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="app_content">
        <RouterProvider router={router} />
      </div>
    </div>
    // <AuthProvider>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<HomePage />} />
    //       <Route path="/login" element={<LoginPage />} />
    //       <Route path="/registration" element={<RegistrationPage />} />
    //       {/* admin */}
    //       <Route
    //         path="/admin/dashboard"
    //         element={
    //           <PrivateRoute>
    //             <AdminDashPage />
    //           </PrivateRoute>
    //         }
    //       />
    //       {/* <Route path="/admin/dashboard">
    //         <AdminDashPage />
    //       </Route> */}

    //       <Route path="/admin/add-department" element={<AddDeptPage />} />
    //       <Route path="/admin/add-teacher" element={<AddTeacherPage />} />
    //       <Route path="/admin/add" element={<AddPage />} />
    //       <Route path="/admin/students" element={<Students />} />
    //       {/* teacher */}
    //       <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />

    //       <Route path="/loading" element={<Loading />} />
    //       {/* <Route path="/a" element={<ArrayA />} /> */}
    //     </Routes>
    //   </Router>
    // </AuthProvider>
  );
}

export default App;
