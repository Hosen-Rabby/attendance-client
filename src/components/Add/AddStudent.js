import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchbatches } from "../../features/batch/batchSlice";
import todaysDate from "../../utils/todaysDate";
import { Col, Container, Row } from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [blood, setBlood] = useState("");
  const [gender, setGender] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [id, setId] = useState("");
  const [section, setSection] = useState("");
  const [birth, setBirth] = useState("");
  const [success, setSuccess] = useState(false);

  const { batches, isLoading, isError, error } = useSelector(
    (state) => state.batches
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchbatches());
  }, [dispatch]);

  // const filterDept = "CSE";
  const filteredDeptData = batches.filter(
    (item) => item.department === filterDept
  );

  const handleDepartment = () => {
    var select = document.getElementById("stu_department_select");
    var value = select.value;
    setFilterDept(value);
  };

  const handleSection = () => {
    var select = document.getElementById("stu_section_select");
    var value = select.value;
    setSection(value);
  };
  const handleBatchCode = () => {
    var select = document.getElementById("batchCode_select");
    var value = select.value;
    setBatchCode(value);
  };

  const handleBlood = () => {
    var select = document.getElementById("stu_blood_select");
    var value = select.value;
    setBlood(value);
  };

  const handleGender = () => {
    var select = document.getElementById("gender_select");
    var value = select.value;
    setGender(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    const data = {
      name,
      email,
      batchCode,
      blood,
      birth,
      phone,
      department: filterDept,
      gender,
      classId: id,
      section,
      admin: false,
      student: true,
      active: true,
      teacher: false,
      createdAt: todaysDate,
    };
    fetch("https://attendance-server-gamma.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          setSuccess(true);
        }
      });
  };

  const removeSection = (e) => {
    document.getElementById("alert").style.display = "none";
  };

  return (
    <Container>
      <div className="add_teacher">
        <h4>Add student</h4>

        <form action="" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <select
                name="department"
                className=""
                onChange={handleDepartment}
                id="stu_department_select"
                required
              >
                <option value="" defaultChecked>
                  Select Department
                </option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="CSE">CSE</option>
              </select>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Phone"
                name="phone"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="number"
                placeholder="Set class id"
                name="id"
                required
                onChange={(e) => setId(e.target.value)}
              />
            </Col>

            <Col md={6}>
              <select
                name="department"
                className=""
                onChange={handleBatchCode}
                id="batchCode_select"
                required
              >
                <option value="" defaultChecked>
                  Batch Code
                </option>

                {filteredDeptData.map((batchoption) => (
                  <option
                    batchoption={batchoption}
                    key={batchoption._id}
                    value={batchoption.batchCode}
                  >
                    {batchoption.batchCode}
                  </option>
                ))}
              </select>

              <select
                name="blood"
                className=""
                onChange={handleBlood}
                id="stu_blood_select"
                required
              >
                <option value="" defaultChecked>
                  Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="AB+">AB+</option>
                <option value="B+">B+</option>
              </select>
              <select
                name="section"
                className=""
                onChange={handleSection}
                id="stu_section_select"
                required
              >
                <option value="" defaultChecked>
                  Section
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
              <select
                name="gender"
                className=""
                onChange={handleGender}
                id="gender_select"
                required
              >
                <option value="" defaultChecked>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="birth">Date of birth</label>
              <input
                type="date"
                onChange={(e) => setBirth(e.target.value)}
                required
              />
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

export default AddStudent;
