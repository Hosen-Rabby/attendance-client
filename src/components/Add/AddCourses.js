import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchbatches } from "../../features/batch/batchSlice";
import todaysDate from "../../utils/todaysDate";

import { Col, Container, Row } from "react-bootstrap";

const AddCourses = () => {
  const [batchCode, setBatchCode] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [elements, setElements] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [success, setSuccess] = useState(false);

  const { batches, isLoading, isError, error } = useSelector(
    (state) => state.batches
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchbatches());
  }, [dispatch]);

  console.log(batches);

  const filteredDeptData = batches.filter(
    (item) => item.department === filterDept
  );
  console.log(filteredDeptData);

  const handleDepartment = () => {
    var select = document.getElementById("addCourse_department_select");
    var value = select.value;
    setFilterDept(value);
  };
  const handleBatchCode = () => {
    var select = document.getElementById("course_batchCode_select");
    var value = select.value;
    setBatchCode(value);
  };

  const handleSemesterCount = () => {
    var select = document.getElementById("semester");
    var value = select.value;
    setSemester(value);
  };

  const handleYearCount = () => {
    var select = document.getElementById("year");
    var value = select.value;
    setYear(value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const isElementInArray = (element) => {
    return elements.includes(element);
  };

  const handleAddElement = () => {
    if (inputValue.trim() !== "" && !isElementInArray(inputValue)) {
      setElements([...elements, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveElement = (element) => {
    const updatedElements = elements.filter((el) => el !== element);
    setElements(updatedElements);
  };

  const handleElementClick = (element) => {
    if (!isElementInArray(element)) {
      setElements([...elements, element]);
    }
  };
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddElement();
    }
  };

  console.log(elements);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    const data = {
      department: filterDept,
      elements,
      batchCode,
      semester,
      year,
      createdAt: todaysDate,
    };
    if (semester === "" && year === "") {
      alert("Please select semeter or year");
    } else {
      fetch("https://attendance-server-gamma.vercel.app/courses", {
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
            // elements.reset();
          }
        });
    }
  };

  return (
    <Container>
      <div className="batch coursess">
        <h4>Add Course</h4>
        <form action="" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              {" "}
              <select
                name="department"
                className=""
                onChange={handleDepartment}
                id="addCourse_department_select"
                required
              >
                <option value="" defaultChecked>
                  Select Department
                </option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="CSE">CSE</option>
              </select>
            </Col>
            <Col md={6}>
              {" "}
              <select
                name="semester"
                className=""
                onChange={handleSemesterCount}
                id="semester"
              >
                <option value="" defaultChecked>
                  Select Semeter
                </option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
              </select>
            </Col>
            <Col md={6}>
              <select
                name="year"
                className=""
                onChange={handleYearCount}
                id="year"
              >
                <option value="" defaultChecked>
                  Select Year
                </option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
              </select>
            </Col>
            <Col md={6}>
              {" "}
              <select
                name="batchCode"
                className=""
                onChange={handleBatchCode}
                id="course_batchCode_select"
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
            </Col>
          </Row>

          <button type="submit" className="submit_btn">
            Submit
          </button>
        </form>

        <Col>
          <div>
            <div className="inputss">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                placeholder="Enter course name and code(Networing-540122)"
              />
              <button onClick={handleAddElement}>Add Element</button>
            </div>
            <div className="course_name">
              {elements.map((element, index) => (
                <p key={index}>
                  {element}
                  <button onClick={() => handleRemoveElement(element)}>
                    Remove
                  </button>
                </p>
              ))}
            </div>
          </div>
        </Col>
        {success && <p className="successfull_msg">Created</p>}
      </div>
    </Container>
  );
};

export default AddCourses;
