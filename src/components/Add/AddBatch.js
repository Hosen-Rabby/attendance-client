import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchbatches } from "../../features/batch/batchSlice";

import todaysDate from "../../utils/todaysDate";
import { Col, Container, Row } from "react-bootstrap";
const AddBatch = () => {
  const [department, setDepartment] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [batchMatched, setBatchMatched] = useState(false);

  const { batches, isLoading, isError, error } = useSelector(
    (state) => state.batches
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchbatches());
  }, [dispatch]);
  console.log(batches);

  const handleDept = () => {
    var select = document.getElementById("department_select_batch");
    var val = select.value;
    setDepartment(val);
  };

  const filterBatch = batches.filter((b) => b.department === department);
  // let batchCode;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside submit");
    console.log(department);
    let deptCode;

    if (department === "Mathematics") {
      deptCode = "Math" + batchNo;
    } else if (department === "English") {
      deptCode = "Eng" + batchNo;
    } else if (department === "CSE") {
      deptCode = "CSE" + batchNo;
    }
    setBatchCode(deptCode);
    const foundBatch = batches.find((batch) => batch.batchCode === deptCode);

    console.log(foundBatch);
    setSuccess(false);
    const data = {
      department,
      batchCode: deptCode,
      batchNo,
      createdAt: todaysDate,
    };
    console.log(data);

    if (foundBatch) {
      setBatchMatched(true);
    } else {
      setBatchMatched(false);
      fetch("https://attendance-server-gamma.vercel.app/batchCodes", {
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
          }
        });
    }
  };

  return (
    <Container>
      <div className="batch">
        <h4>Add batch</h4>
        <div className="running_batch">
          {filterBatch.length > 0 && <h6>Running Batches:</h6>}
          {filterBatch.map((b) => (
            <p b={b}>{b.batchCode} </p>
          ))}
        </div>
        <form onSubmit={handleSubmit} action="">
          <Row>
            <Col md={6}>
              <select
                name="department"
                className=""
                onChange={handleDept}
                id="department_select_batch"
                required
              >
                <option value="" defaultChecked>
                  Department
                </option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="CSE">CSE</option>
              </select>
            </Col>
            <Col md={6}>
              <input
                type="number"
                placeholder="Batch No."
                required
                onChange={(e) => setBatchNo(e.target.value)}
              />
            </Col>
          </Row>

          <button type="submit" className="submit_btn">
            Submit
          </button>
          {batchMatched && <p>Batch no already exist!</p>}
          {success && (
            <p className="successfull_msg">New batch created {batchCode}</p>
          )}
        </form>
      </div>
    </Container>
  );
};

export default AddBatch;
