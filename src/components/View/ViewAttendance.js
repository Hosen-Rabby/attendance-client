import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchbatches } from "../../features/batch/batchSlice";
import { fetchStudents } from "../../features/students/studentsSlice";
import { fetchCourses } from "../../features/courses/coursesSlice";
import { fetchAttends } from "../../features/attend/attendSlice";
import { fetchIndiAttend } from "../../features/indiAttends/indiAttendSlice";
import { fetchAccounts } from "../../features/account/accountSlice";
import Loading from "../../utils/Loading";

const ViewAttendance = () => {
  const { user } = useAuth();
  let percentCompare = 80;

  const [batchCode, setBatchCode] = useState("");
  const [attenSecVal, setAttendSecVal] = useState("");
  const [courseNameVal, setCourseNameVal] = useState("");
  const [countIn, setCountIn] = useState(percentCompare);
  const [courseTeacher, setCourseTeacher] = useState({});

  const { accounts, isLoading, isError, error } = useSelector(
    (state) => state.accounts
  );
  const { batches } = useSelector((state) => state.batches);
  const { attends } = useSelector((state) => state.attend);
  const { indiAttend } = useSelector((state) => state.indiAttend);
  const { courses } = useSelector((state) => state.courses);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchbatches());
    dispatch(fetchCourses());
    dispatch(fetchAttends());
    dispatch(fetchIndiAttend());
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleBatchCode = () => {
    var select = document.getElementById("batchCode_select");
    var value = select.value;
    setBatchCode(value);
  };

  console.log(indiAttend);
  const attendSec = () => {
    var select = document.getElementById("attendSec");
    var value = select.value;
    setAttendSecVal(value);
  };
  const handleAttendCourse = () => {
    var select = document.getElementById("courseName_select");
    var value = select.value;
    setCourseNameVal(value);
  };

  useEffect(() => {
    fetch(`https://attendance-server-gamma.vercel.app/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setCourseTeacher(data));
  }, [user?.email]);
  const filteredCourseName = courses.filter(
    (item) => item.batchCode === batchCode
  );

  const filteredDeptData = batches.filter(
    (item) => item?.department === courseTeacher?.department
  );
  const courseName = filteredCourseName[filteredCourseName.length - 1];
  // filter attends
  // filter
  const filteredStudents = accounts.filter(
    (obj) =>
      obj.student === true &&
      obj.batchCode === batchCode &&
      obj.section === attenSecVal
  );

  const filterAttendStudent = attends.filter(
    (obj) =>
      obj.batch === batchCode &&
      obj.courseName === courseNameVal &&
      obj.section === attenSecVal
  );
  const filterBatchCourseName = indiAttend.filter(
    (indi) => indi.batch === batchCode && indi.courseName === courseNameVal
  );
  let filterIndiCount;
  const handleIndiAttend = (classId) => {
    filterIndiCount = filterBatchCourseName.filter(
      (i) => i.classId === classId
    );
  };

  const courseTotalClass = attends.filter(
    (classTaken) =>
      classTaken.batch === batchCode && classTaken.courseName === courseNameVal
  );

  // decide what to render
  let content;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) {
    content = <div>{error}</div>;
  }

  if (!isLoading && !isError && accounts?.length === 0) {
    content = <div>No students found</div>;
  }
  if (!isLoading && !isError && accounts?.length > 0) {
    content = filteredStudents.map((student) => {
      handleIndiAttend(student.classId);
      let classPercentage;
      if (courseTotalClass?.length === 0) {
        classPercentage = 0;
      } else {
        classPercentage = Math.ceil(
          (filterIndiCount?.length / courseTotalClass?.length) * 100
        );
      }

      return (
        <div
          className={
            countIn <= classPercentage ? "percent percent_green" : "percent"
          }
          key={student?._id}
          student={student}
        >
          <div>
            <p>
              {student?.classId}{" "}
              <span>
                {courseNameVal === "" ? (
                  <p></p>
                ) : (
                  <>
                    | <span>{filterIndiCount?.length}</span>
                  </>
                )}
              </span>
            </p>

            <span
              className={
                countIn <= classPercentage
                  ? "percent_digit percent_green"
                  : "percent_digit"
              }
            >
              {courseNameVal === "" ? (
                <p></p>
              ) : (
                <>
                  <h6>{classPercentage}%</h6>
                </>
              )}
            </span>
          </div>
        </div>
      );
    });
  }
  console.log(filterAttendStudent);
  return (
    <Container>
      <div className="view">
        <h4>Attendance History</h4>
        <Row>
          <Col md={4}>
            <select
              name="batch"
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
          </Col>
          <Col md={4}>
            <select onChange={attendSec} id="attendSec" required>
              <option value="" defaultChecked>
                Section
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </Col>
          <Col md={4}>
            <select
              name="course"
              className=""
              onChange={handleAttendCourse}
              id="courseName_select"
              required
            >
              <option value="" defaultChecked>
                Select Course
              </option>

              {courseName?.elements?.map((courseN) => (
                <option courseN={courseN} key={courseN._id} value={courseN}>
                  {courseN}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="percent_holder">
              <div>
                <h4>
                  Over All{" "}
                  {courseTotalClass?.length > 0 && (
                    <span>Class taken: {courseTotalClass?.length}</span>
                  )}
                </h4>
                {courseNameVal === "" ? (
                  <></>
                ) : (
                  <spam>
                    <label>Count In: </label>
                    <input
                      type="number"
                      name=""
                      id=""
                      min="10"
                      max="100"
                      value={countIn}
                      onChange={(e) => {
                        setCountIn(e.target.value);
                      }}
                    />
                  </spam>
                )}
              </div>
              {courseNameVal === "" ? <></> : <>{content}</>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {filterAttendStudent.reverse().map((obj) => (
              <div className="attend_history" obj={obj} key={obj.key}>
                <div>
                  <h6>{obj.createdAt}</h6>
                </div>
                {obj.attend.map((a) => (
                  <p className="attend_single" a={a}>
                    {a}
                  </p>
                ))}
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ViewAttendance;
