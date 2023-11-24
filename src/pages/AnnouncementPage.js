import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const AnnouncementPage = () => {
  const sidebarId = 4;
  return (
    <div className="announcement page">
      <Sidebar sidebarId={sidebarId} />
      <div className="right_content">Coming soon</div>
    </div>
  );
};

export default AnnouncementPage;
