import React from "react";
import AddStudent from "../components/Add/AddStudent";
import AddBatch from "../components/Add/AddBatch";
import AddTeacher from "../components/Add/AddTeacher";
import { Container } from "react-bootstrap";
import AddCourses from "../components/Add/AddCourses";

const AddPage = () => {
  return (
    <div>
      <Container>
        <AddTeacher />
        <AddStudent />
        <AddBatch />
        <AddCourses />
      </Container>
    </div>
  );
};

export default AddPage;
