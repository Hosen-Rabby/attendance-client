import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import AddTeacher from "../components/Add/AddTeacher";
import { Container } from "react-bootstrap";
import AllTeachers from "../components/All/AllTeachers";
import AddBatch from "../components/Add/AddBatch";

const BatchPage = () => {
  const sidebarId = 8;
  return (
    <div className="batch_page page">
      <Sidebar sidebarId={sidebarId} />
      <div className="right_content">
        <AddBatch />
        {/* <AddTeacher /> */}
      </div>
    </div>
  );
};

export default BatchPage;
