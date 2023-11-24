import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const TeacherDash = () => {
  return (
    <div>
      <Container>
        <h3>Teacher Dashboard</h3>
        <Link to="/teacher/attendance">Attendance</Link>
        <br />
        <Link to="/teacher/announcement">Announcement</Link>
        <br />
        <Link to="/teacher/routine">Routine</Link>
        <br />
      </Container>
    </div>
  );
};

export default TeacherDash;
