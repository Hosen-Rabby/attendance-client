import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttends } from "../../features/attend/attendSlice";
import Loading from "../../utils/Loading";
import { fetchIndiAttend } from "../../features/indiAttends/indiAttendSlice";
import { fetchAccounts } from "../../features/account/accountSlice";
import useAuth from "../../hooks/useAuth";
import { fetchbatches } from "../../features/batch/batchSlice";
import { fetchCourses } from "../../features/courses/coursesSlice";

const AttendStudent = () => {
  const { attends, isLoading, isError, error } = useSelector(
    (state) => state.attend
  );
  const { indiAttend } = useSelector((state) => state.indiAttend);
  const { batches } = useSelector((state) => state.batches);
  const { accounts } = useSelector((state) => state.accounts);
  const { courses } = useSelector((state) => state.courses);

  const [batchCode, setBatchCode] = useState("");
  const [courseNameVal, setCourseNameVal] = useState("");

  const { user } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAttends());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIndiAttend());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchbatches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  console.log(attends);
  console.log(user.email);

  // =========== ++++++ =============
  // =========== filter =============
  // =========== ++++++ =============

  const filterAccount = accounts.filter(
    (record) => record.email === user?.email
  );
  // const filterCourse = attends.slice(-3).filter(
  const filterCourse = attends.filter(
    (record) => record.courseName === "Information System Management-540221"
  );
  const filteredIndiAttendance = indiAttend.filter(
    (record) =>
      record.courseName === "Information System Management-540221" &&
      record.classId === "20666"
  );

  const filteredCourseName = courses.filter(
    (item) => item.batchCode === batchCode
  );

  const filteredDeptData = batches.filter(
    (item) => item.department === filterAccount[0]?.department
  );
  console.log(batches);

  const courseName = filteredCourseName[filteredCourseName.length - 1];
  console.log(courseName?.semester);
  const handleBatchCode = () => {
    var select = document.getElementById("batchCode_select");
    var value = select.value;
    setBatchCode(value);
  };

  const handleAttendCourse = () => {
    var select = document.getElementById("courseName_select");
    var value = select.value;
    setCourseNameVal(value);
  };
  // decide what to render

  const filterAttendsWithBatch = attends.filter(
    (item) => item.batch === batchCode && item.courseName === courseNameVal
  );

  console.log(filterAttendsWithBatch);
  let content;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) {
    content = <div>{error}</div>;
  }

  if (!isLoading && !isError && filterAttendsWithBatch?.length === 0) {
    content = <div>No students found</div>;
  }

  if (!isLoading && !isError && filterAttendsWithBatch?.length > 0) {
    content = filterAttendsWithBatch.map((attend) => (
      <div key={attend._id} attend={attend}>
        <p>{attend.createdAt}</p>
        {attend?.attend?.map((stu) => (
          <h2>{stu}</h2>
        ))}
      </div>
    ));
  }
  return (
    <div>
      <h4>Attend students</h4>

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

      <>
        <>{content}</>
      </>

      <div className="attendance-comparison">
        {filterCourse.slice(-3).map((classRecord) => (
          <div key={classRecord.createdAt} className="attendance-record">
            <div
              className={`circle ${
                filteredIndiAttendance.some(
                  (studentRecord) =>
                    studentRecord.createdAt === classRecord.createdAt
                )
                  ? "green"
                  : "red"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendStudent;
