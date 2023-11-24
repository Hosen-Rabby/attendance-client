import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ViewAttendance from "../components/View/ViewAttendance";

const ViewPage = () => {
  const sidebarId = 7;
  return (
    <div className="viewpage page">
      <Sidebar sidebarId={sidebarId} />
      <div className="right_content">
        {/* <AllTeachers />
        <AddTeacher /> */}
        <ViewAttendance />
      </div>
    </div>
  );
};

export default ViewPage;
