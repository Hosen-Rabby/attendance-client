import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  // console.log(user);
  return (
    <div>
      <h3>Welcome to Student Attendance Management App.</h3>
      <Link to="/login">Login</Link>
      <br></br>
      <Link to="/registration">Register</Link>
      <br></br>
      <Link to="/admin/dashboard">Admin</Link>
      <br></br>
      <Link to="/teacher/dashboard">Teacher</Link>
      <br></br>
    </div>
  );
};

export default Home;
