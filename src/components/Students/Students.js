import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../features/students/studentsSlice";
import Loading from "../../utils/Loading";
import { Col, Container, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { fetchbatches } from "../../features/batch/batchSlice";
import { fetchCourses } from "../../features/courses/coursesSlice";
import { fetchAccounts } from "../../features/account/accountSlice";
import { fetchAttends } from "../../features/attend/attendSlice";
import todaysDate from "../../utils/todaysDate";
import { fetchIndiAttend } from "../../features/indiAttends/indiAttendSlice";
// import { Container } from "@mui/material";

const Students = () => {
  const { accounts, isLoading, isError, error } = useSelector(
    (state) => state.accounts
  );

  const { batches } = useSelector((state) => state.batches);
  const { attends } = useSelector((state) => state.attend);
  const { indiAttend } = useSelector((state) => state.indiAttend);
  const { courses } = useSelector((state) => state.courses);

  const [elements, setElements] = useState([]);
  const [success, setSuccess] = useState(false);
  const [batchCode, setBatchCode] = useState("");
  const [attenSecVal, setAttendSecVal] = useState("");
  const [courseNameVal, setCourseNameVal] = useState("");
  const [courseTeacher, setCourseTeacher] = useState({});
  const { user } = useAuth();

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

  const date = new Date();
  // const todaysDate = date.toLocaleDateString();

  // filter section
  const filteredCourseName = courses.filter(
    (item) => item.batchCode === batchCode
  );

  const filteredDeptData = batches.filter(
    (item) => item?.department === courseTeacher?.department
  );

  const courseName = filteredCourseName[filteredCourseName.length - 1];

  const courseTotalClass = attends.filter(
    (classTaken) =>
      classTaken.batch === batchCode && classTaken.courseName === courseNameVal
  );
  const classTaken = attends.filter(
    (c) =>
      c.batch === batchCode &&
      c.courseName === courseNameVal &&
      c.createdAt === todaysDate
  );

  const filterBatchCourseName = indiAttend.filter(
    (indi) => indi.batch === batchCode && indi.courseName === courseNameVal
  );

  // filter
  const filteredStudents = accounts.filter(
    (obj) =>
      obj.student === true &&
      obj.batchCode === batchCode &&
      obj.section === attenSecVal
  );
  // const filterCourse = attends.filter(
  //   (record) => record.courseName === "Information System Management-540221"
  // );
  const filteredIndiAttendance = indiAttend.filter(
    (record) =>
      record.courseName === courseNameVal && record.classId === "20666"
  );

  console.log(classTaken.length);

  // get individual attend count

  let filterIndiCount;
  const handleIndiAttend = (classId) => {
    filterIndiCount = filterBatchCourseName.filter(
      (i) => i.classId === classId
    );
  };

  // handle click attend

  const handleButtonClick = (_id) => {
    if (elements.includes(_id)) {
      const updatedElements = elements.filter((id) => id !== _id);
      setElements(updatedElements);
    } else {
      setElements([...elements, _id]);
      const indiData = {
        teacher: user?.email,
        section: attenSecVal,
        semester: courseName?.semester,
        classId: _id,
        courseName: courseNameVal,
        batch: batchCode,
        department: courseTeacher?.department,
        createdAt: todaysDate,
      };

      fetch("https://attendance-server-gamma.vercel.app/individualAttend", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(indiData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.acknowledged) {
            // setSuccess(true);
            // console.log(e.deptName.value);
          }
        });
    }
  };

  const filteredArray = elements.filter((element) => element !== "Array");

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(false);
    const data = {
      teacher: user?.email,
      section: attenSecVal,
      courseName: courseNameVal,
      batch: batchCode,
      department: courseTeacher?.department,
      totalStudents: filteredStudents?.length,
      presentStudents: elements?.length,
      semester: courseName?.semester,
      createdAt: todaysDate,
      attend: filteredArray,
    };

    fetch("https://attendance-server-gamma.vercel.app/attendStudents", {
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
  // const batchCodeToFind = "CSE20";

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
      const classPercentage = Math.ceil(
        (filterIndiCount?.length / courseTotalClass?.length) * 100
      );

      return (
        <tr key={student?._id} student={student}>
          <td>{student?.name}</td>
          <td> {student.classId}</td>
          <td className="history">
            {" "}
            {courseTotalClass.map((classRecord) => (
              <span key={classRecord._id} className="attendance-record">
                <span
                  title={classRecord.createdAt}
                  className={`circle ${
                    indiAttend
                      .filter(
                        (record) =>
                          record.courseName === courseNameVal &&
                          record.classId === student?.classId
                      )
                      .some(
                        (studentRecord) =>
                          studentRecord.createdAt === classRecord.createdAt
                      )
                      ? "green"
                      : "red"
                  }`}
                >
                  {indiAttend
                    .filter(
                      (record) =>
                        record.courseName === courseNameVal &&
                        record.classId === student?.classId
                    )
                    .some(
                      (studentRecord) =>
                        studentRecord.createdAt === classRecord.createdAt
                    ) ? (
                    <>P</>
                  ) : (
                    <>A</>
                  )}
                </span>
              </span>
            ))}
          </td>
          <td>
            <div
              onClick={() => handleButtonClick(student.classId)}
              className={
                elements.includes(student.classId)
                  ? "attendance_btn present"
                  : "attendance_btn"
              }
            >
              <div className="attend_ball"></div>
            </div>
          </td>
        </tr>
      );
    });
  }

  let overAllContent;

  if (!isLoading && !isError && accounts?.length > 0) {
    overAllContent = filteredStudents.map((student) => {
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
        <div key={student?._id} student={student}>
          <p>{student?.classId}</p>
          <span>
            {courseNameVal === "" ? (
              <p></p>
            ) : (
              <>
                <span>{filterIndiCount?.length}</span>|
                <strong>{classPercentage} % </strong>
              </>
            )}
          </span>
        </div>

        // <tr key={student?._id} student={student}>
        //   <td>{student?.name}</td>
        //   <td> {student.classId}</td>
        //   <td className="history">
        //     {" "}
        //     {courseTotalClass.map((classRecord) => (
        //       <span key={classRecord.createdAt} className="attendance-record">
        //         <span
        //           title={classRecord.createdAt}
        //           className={`circle ${
        //             indiAttend
        //               .filter(
        //                 (record) =>
        //                   record.courseName === courseNameVal &&
        //                   record.classId === student?.classId
        //               )
        //               .some(
        //                 (studentRecord) =>
        //                   studentRecord.createdAt === classRecord.createdAt
        //               )
        //               ? "green"
        //               : "red"
        //           }`}
        //         >
        //           {indiAttend
        //             .filter(
        //               (record) =>
        //                 record.courseName === courseNameVal &&
        //                 record.classId === student?.classId
        //             )
        //             .some(
        //               (studentRecord) =>
        //                 studentRecord.createdAt === classRecord.createdAt
        //             )
        //             ? <>P</>
        //             : <>A</>}
        //         </span>
        //       </span>
        //     ))}
        //   </td>
        //   <td>
        //     <div
        //       onClick={() => handleButtonClick(student.classId)}
        //       className={
        //         elements.includes(student.classId)
        //           ? "attendance_btn present"
        //           : "attendance_btn"
        //       }
        //     >
        //       <div className="attend_ball"></div>
        //     </div>
        //   </td>
        // </tr>
      );
    });
  }

  return (
    // <div className="attendance_take">
    <Container>
      <div className="attendance_taking">
        <h4>Attendance</h4>
        {/* <Row>{overAllContent}</Row> */}
        <Row>
          <Col md={4}>
            <p> Total Students: {filteredStudents?.length}</p>
          </Col>

          <Col md={4}>
            <p>Class Taken: {courseTotalClass.length}</p>
          </Col>
          <Col md={4}>
            <p>Present: {elements?.length}</p>
          </Col>
        </Row>
        <Row>
          {/* <h5>Teacher: {courseTeacher.name}</h5>
          <h5>Department: {courseTeacher.department}</h5> */}
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
            {/* <form action="" onSubmit={handleSubmit}>
              <div className="form_content">
                {content}
                <button
                  type="submit"
                  disabled={
                    isError || isLoading || success || students?.length === 0
                  }
                  className="submit_btn"
                >
                  Submit
                </button>
              </div>
            </form>
            {success && <>Done</>} */}
            <section class="table__body ">
              {/* {filterTeacher.map((t) => ( */}
              {/* <tr t={t} key={t._id}> */}
              {/* <tr> */}
              <form action="" onSubmit={handleSubmit}>
                <div className="form_content">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Class Id</th>
                        <th>History</th>
                        {/* <th>Blood</th> */}
                        <th>BTN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content}
                      {/* </tr> */}
                    </tbody>
                  </table>
                </div>
                <button
                  type="submit"
                  disabled={
                    isError ||
                    isLoading ||
                    success ||
                    accounts?.length === 0 ||
                    classTaken?.length > 0
                  }
                  className="submit_btn attend_submit"
                >
                  Submit
                </button>
              </form>
            </section>
          </Col>
        </Row>
      </div>
      {classTaken?.length > 0 && (
        <p className="successfull_msg">Class Already taken</p>
      )}
    </Container>
    // </div>
  );
};

export default Students;
