import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutine } from "../../features/routine/routineSlice";
import todaysDate from "../../utils/todaysDate";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { fetchbatches } from "../../features/batch/batchSlice";
import { fetchCourses } from "../../features/courses/coursesSlice";
import { fetchAttends } from "../../features/attend/attendSlice";
import { fetchIndiAttend } from "../../features/indiAttends/indiAttendSlice";
import { fetchAccounts } from "../../features/account/accountSlice";
import useAuth from "../../hooks/useAuth";
import { fetchStudents } from "../../features/students/studentsSlice";
import Loading from "../../utils/Loading";

const Rout = () => {
  const { user } = useAuth();
  const [batchCode, setBatchCode] = useState("");
  const [attendSecVal, setAttendSecVal] = useState("");
  const [textt, setTextt] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);

  const { routines, isLoading, isError, error } = useSelector(
    (state) => state.routines
  );
  const allRoutine = [...routines].reverse();
  console.log(routines);
  console.log(allRoutine);

  const { accounts } = useSelector((state) => state.accounts);
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
    dispatch(fetchRoutine());
  }, [dispatch]);

  console.log(textt);
  const filterAccount = accounts.filter((a) => a.email === user?.email);
  // filter

  const filteredDepartment = accounts.filter(
    (item) => item?.email === user?.email
  );
  const filteredDepartmentTeacher = accounts.filter(
    (item) =>
      item?.department === filteredDepartment[0]?.department &&
      item?.teacher === true
  );
  const filteredDeptData = batches.filter(
    (item) => item?.department === filteredDepartment[0]?.department
  );
  const filteredCourses = courses.filter(
    (item) => item?.batchCode === batchCode
  );
  const courseName = filteredCourses[filteredCourses.length - 1];
  console.log(courseName);

  console.log(filteredDepartmentTeacher);
  console.log(filteredDepartment[0]?.department);
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

  const handleCheckboxChange = (name) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((item) => item !== name)); // Remove the name
    } else {
      setSelectedNames([...selectedNames, name]); // Add the name
    }
  };
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday",
  ];

  const initialRoutine = daysOfWeek.map((day) => ({
    day,
    periods: [{ timeFrom: "", timeTo: "", subjectCode: "", courseTeacher: "" }],
  }));

  const [routine, setRoutine] = useState(initialRoutine);

  const addPeriod = (dayIndex) => {
    const updatedRoutine = [...routine];
    updatedRoutine[dayIndex].periods.push({
      timeFrom: "",
      timeTo: "",
      subjectCode: "",
      courseTeacher: "",
    });
    setRoutine(updatedRoutine);
  };

  const removePeriod = (dayIndex, periodIndex) => {
    const updatedRoutine = [...routine];
    const dayData = updatedRoutine[dayIndex];

    if (dayData.periods.length === 1) {
      // Disable removal if there's only one period
      return;
    } else {
      // Remove the period
      dayData.periods.splice(periodIndex, 1);
    }

    setRoutine(updatedRoutine);
  };

  // decide what to render
  let content;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) {
    content = <div>{error}</div>;
  }

  if (!isLoading && !isError && routines?.length === 0) {
    content = <div>No students found</div>;
  }
  if (!isError && !isLoading && routines.length > 0) {
    content = (
      // <Container>
      <Row>
        {allRoutine.map((routine) => (
          <Col md={12} routine={routine}>
            <div class="routine_table">
              <div class="table__header">
                <h6 className="r_head">
                  {routine.batchCode} | {routine.section} |{" "}
                  {<small>{routine.createdAt}</small>}
                </h6>
                <p>{routine.text}</p>

                <div className="teacher_list">
                  <h6>Course Name:</h6>
                  {routine?.courses?.map((t) => (
                    <p t={t}>{t}</p>
                  ))}
                </div>
                <div className="teacher_list">
                  <h6>Teachers:</h6>
                  {routine?.teachers?.map((t) => (
                    <p t={t}>{t}</p>
                  ))}
                </div>
              </div>
              <section class="table__body routine_table_body">
                <table>
                  <thead>
                    <tr>
                      {routine?.routine?.map((d) => (
                        <td d={d}>{d.day}</td>
                      ))}
                    </tr>
                    {/* {routine.routine} */}
                  </thead>
                  <tbody>
                    <tr>
                      {routine.routine?.map((t) => (
                        <td t={t}>
                          {t.periods?.map((p) => (
                            <div p={p} className="periods">
                              <p>
                                {p.timeFrom} - {p.timeTo}
                              </p>
                              <p>{p.subjectCode}</p>
                              <p>{p.courseTeacher}</p>
                              {/* </p> */}
                              {/* <p p={p}> </p> */}
                            </div>
                          ))}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </Col>
        ))}
      </Row>
      // </Container>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out days with no periods or with a single empty period
    const filteredRoutine = routine.filter((dayData) => {
      return (
        dayData.periods.length > 0 &&
        !dayData.periods.every((period) => {
          return (
            !period.timeFrom &&
            !period.timeTo &&
            !period.subjectCode &&
            !period.courseTeacher
          );
        })
      );
    });
    const data = {
      text: textt,
      courses: courseName?.elements,
      batchCode: batchCode,
      section: attendSecVal,
      teachers: selectedNames,
      createdAt: todaysDate,
      routine: filteredRoutine,
    };

    fetch("https://attendance-server-gamma.vercel.app/routine", {
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
          setRoutine(initialRoutine);
        }
      });
  };

  return (
    <Container>
      {filterAccount[0]?.student === true ? (
        <></>
      ) : (
        <div className="routine_body">
          <h4>Create New Routine</h4>
          <Row>
            <Col md={6}>
              {" "}
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
            <Col md={6}>
              <select onChange={attendSec} id="attendSec" required>
                <option value="" defaultChecked>
                  Section
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="text_area">
                <textarea
                  id=""
                  name="w3review"
                  placeholder="Write about class room and class start date..."
                  onChange={(e) => setTextt(e.target.value)}
                  required
                ></textarea>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <div className="show_courses text-left">
                <h6>Courses: </h6>
                {courseName?.elements?.map((c) => (
                  <p c={c} key={c._id}>
                    {c}
                  </p>
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <div className="show_teachers">
              <h6>Teachers: </h6>
              {filteredDepartmentTeacher?.map((t) => (
                <Col md={4} t={t}>
                  <div className="teacher_check">
                    <input
                      type="checkbox"
                      id={t._id}
                      name={t.name}
                      value={t.name}
                      onChange={() => handleCheckboxChange(t.name)}
                    />
                    <label for={t.name}>{t.name}</label>
                  </div>
                </Col>
              ))}
            </div>
          </Row>
          <form onSubmit={handleSubmit}>
            {routine.map((dayData, dayIndex) => (
              <div key={dayIndex} className="routine_days">
                <h5>{dayData.day}</h5>
                {dayData.periods.map((period, periodIndex) => (
                  <div key={periodIndex} className="routine_fields">
                    <div className="times">
                      {" "}
                      <input
                        type="time"
                        value={period.timeFrom}
                        onChange={(e) => {
                          const updatedRoutine = [...routine];
                          updatedRoutine[dayIndex].periods[
                            periodIndex
                          ].timeFrom = e.target.value;
                          setRoutine(updatedRoutine);
                        }}
                      />
                      <label>To</label>
                      <input
                        type="time"
                        value={period.timeTo}
                        onChange={(e) => {
                          const updatedRoutine = [...routine];
                          updatedRoutine[dayIndex].periods[periodIndex].timeTo =
                            e.target.value;
                          setRoutine(updatedRoutine);
                        }}
                      />
                    </div>
                    <div className="sub_course">
                      <input
                        type="text"
                        value={period.subjectCode}
                        placeholder="Course Code"
                        onChange={(e) => {
                          const updatedRoutine = [...routine];
                          updatedRoutine[dayIndex].periods[
                            periodIndex
                          ].subjectCode = e.target.value;
                          setRoutine(updatedRoutine);
                        }}
                      />
                      <input
                        type="text"
                        value={period.courseTeacher}
                        placeholder="Course Teacher"
                        onChange={(e) => {
                          const updatedRoutine = [...routine];
                          updatedRoutine[dayIndex].periods[
                            periodIndex
                          ].courseTeacher = e.target.value;
                          setRoutine(updatedRoutine);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePeriod(dayIndex, periodIndex)}
                      disabled={dayData.periods.length === 1}
                      className="routine_remove"
                    >
                      <AiFillMinusSquare />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="routine_add"
                  onClick={() => addPeriod(dayIndex)}
                >
                  <AiFillPlusSquare />
                </button>
              </div>
            ))}
            <button type="submit" className="submit_btn">
              Submit
            </button>
            {success && <>Created</>}
          </form>
        </div>
      )}
      <div className="all_routines">
        {
          content
          //   routines?.map()
        }
      </div>
    </Container>
  );
};

export default Rout;
