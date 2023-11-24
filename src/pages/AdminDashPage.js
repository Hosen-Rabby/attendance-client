import React from "react";
import AdminDash from "../components/Dashboard/AdminDash";
import Sidebar from "../components/Sidebar/Sidebar";

const AdminDashPage = () => {
  const sidebarId = 1;
  return (
    <div className="dashboard page">
      <Sidebar sidebarId={sidebarId} />
      <AdminDash />
    </div>
  );
};

export default AdminDashPage;
