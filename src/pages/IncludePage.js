import React from "react";
import Students from "../components/Students/Students";
import AllStudents from "../components/All/AllStudents";
import Sidebar from "../components/Sidebar/Sidebar";
import AddTeacher from "../components/Add/AddTeacher";
import AddCourses from "../components/Add/AddCourses";
import AddBatch from "../components/Add/AddBatch";

const IncludePage = () => {
  const sidebarId = 10;
  return (
    <div>
      <div className="students page">
        <Sidebar sidebarId={sidebarId} />
        <div className="right_content">
          <AddBatch />
          <AddCourses />
        </div>
      </div>
    </div>
  );
};

export default IncludePage;
