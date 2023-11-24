import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ArrayManipulationComponent.css"; // Import your CSS file
import todaysDate from "../../utils/todaysDate";
import { useSelector } from "react-redux";
import props from "prop-types";

const StudentGrid = ({ student }) => {
  const { students, isLoading, isError, error } = useSelector(
    (state) => state.students
  );
  const idList = students.map((student) => student._id);
  // console.log(idList);

  const { name, birth, _id } = student;
  // console.log(idList);
  let [elements, setElements] = useState([]);
  let [success, setSuccess] = useState([]);
  // console.log("before funciton:", elements);

  const handleButtonClick = (_id) => {
    console.log("inside funciton:", elements);
    if (elements.includes(_id)) {
      const updatedElements = elements.filter((id) => id !== _id);
      setElements([updatedElements]);
    } else {
      setElements([...elements, _id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    const data = {};
    console.log(data);
    fetch("https://attendance-server-gamma.vercel.app/students", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          setSuccess(true);
          // console.log(e.deptName.value);
        }
      });
  };
  // console.log("ele", elements);

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <div>
              <p>
                <button
                  className={
                    elements.includes(_id) ? "active-button" : "action-button"
                  }
                  onClick={() => props.handleButtonClick(_id)}
                >
                  Button {_id}
                </button>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentGrid;
