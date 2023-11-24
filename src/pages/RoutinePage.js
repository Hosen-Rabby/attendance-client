import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Routine from "../components/Routine/Routine";
import Rout from "../components/Routine/Rout";

const RoutinePage = () => {
  const sidebarId = 5;
  return (
    <div className="routine_page page">
      <Sidebar sidebarId={sidebarId} />
      <div className="right_content">
        {/* <Routine /> */}
        <Rout />
      </div>
      {/* <Routine /> */}
    </div>
  );
};

export default RoutinePage;
