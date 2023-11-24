import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import AddTeacher from "../components/Add/AddTeacher";
import { Container } from "react-bootstrap";
import AllTeachers from "../components/All/AllTeachers";
import AddCourses from "../components/Add/AddCourses";

const CoursePage = () => {
  const sidebarId =9;
  return (
    <div className="course_page page">
      <Sidebar sidebarId={sidebarId} />
      <div className="right_content">
        <AddCourses />
        {/* <AddTeacher /> */}
      </div>
    </div>
  );
};

export default CoursePage;
