import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DateField from "@mui/material/TextField";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import todaysDate from "../../utils/todaysDate";

// import Input from "@mui/joy/Input";

const AddTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [blood, setBlood] = useState("");
  const [birth, setBirth] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const formRef = useRef(null);
  const handleDept = () => {
    var select = document.getElementById("department_select");
    var value = select.value;
    setDepartment(value);
  };
  const handleBlood = () => {
    var select = document.getElementById("blood_select");
    var value = select.value;
    setBlood(value);
  };
  console.log(department);
  // const date = new Date();
  // const todaysDate = date.toLocaleDateString();
  // console.log(date);
  console.log("date:", todaysDate);
  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(false);
    const data = {
      name,
      email,
      department,
      blood,
      birth,
      designation,
      admin: false,
      student: false,
      teacher: true,
      createdAt: todaysDate,
    };
    console.log(data);
    fetch("https://attendance-server-gamma.vercel.app/users", {
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
          formRef.current.reset();
          // e.target.value = "";
        }
      });
  };

  return (
    <Container fluid>
      <div className="add_teacher">
        <h4>Add teacher</h4>
        <form action="" onSubmit={handleSubmit} ref={formRef}>
          <Row>
            <Col md={6} xs={12}>
              <label htmlFor="">Department*</label>
              <select
                name="department"
                className=""
                onChange={handleDept}
                id="department_select"
                required
              >
                <option value="" defaultChecked>
                  Department
                </option>
                <option value="Mathmetics">Mathmatics</option>
                <option value="English">English</option>
                <option value="CSE">CSE</option>
              </select>
              <label htmlFor="">Name*</label>

              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="">Email*</label>

              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="">Phone*</label>

              <input
                type="number"
                placeholder="Phone"
                name="phone"
                required
                onChange={(e) => setPhone(e.target.value)}
              />

              {/* <Input placeholder="Type in here…" /> */}
            </Col>

            <Col md={6} xs={12}>
              <label htmlFor="">Designation</label>

              <input
                type="text"
                placeholder="Designation"
                name="designation"
                onChange={(e) => setDesignation(e.target.value)}
              />
              <label htmlFor="">Blood Group</label>

              <select
                name="blood"
                className=""
                onChange={handleBlood}
                id="blood_select"
              >
                <option value="" defaultChecked>
                  Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="AB+">AB+</option>
                <option value="B+">B+</option>
              </select>
              <label htmlFor="birth">Date of birth</label>
              <input type="date" onChange={(e) => setBirth(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <button type="submit" className="submit_btn">
                Submit
              </button>
              {success && (
                <span className="successfull_msg">
                  Successfull added!{" "}
                  <RxCrossCircled onClick={() => setSuccess(false)} />
                </span>
              )}
            </Col>
            <Col xs={8}></Col>
          </Row>
        </form>
      </div>
    </Container>
  );
};

export default AddTeacher;
