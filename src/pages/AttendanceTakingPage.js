import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Students from "../components/Students/Students";
const AttendanceTakingPage = () => {
  const sidebarId = 6;
  return (
    <div className="attendance page">
      <Sidebar sidebarId={sidebarId} />
      <div className="right_content">
        <Students />
      </div>
    </div>
  );
};

export default AttendanceTakingPage;
