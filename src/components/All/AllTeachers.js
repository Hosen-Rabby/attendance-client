import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../features/account/accountSlice";
import Loading from "../../utils/Loading";
import { Container, Row, Col } from "react-bootstrap";
import TableList from "./TableList";
import { BiError } from "react-icons/bi";
import netError from "../../assets/network_error.png";
// import netError from "../../assets/network.png";

const AllTeachers = () => {
  const [filterTeacherDept, setFilterTeacherDept] = useState("");
  const { accounts, isLoading, isError, error } = useSelector(
    (state) => state.accounts
  );

  const handleFilterDept = () => {
    var select = document.getElementById("filter_teacher_department_select");
    var value = select.value;
    setFilterTeacherDept(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  // filter only teacher
  let filterTeacher;
  if (filterTeacherDept === "") {
    filterTeacher = accounts.filter(
      (acc) => acc.teacher === true && acc.student === false
    );
  } else {
    filterTeacher = accounts.filter(
      (acc) =>
        acc.teacher === true &&
        acc.student === false &&
        acc.department === filterTeacherDept
    );
  }

  console.log(filterTeacher);
  // define what to render
  let content;
  if (isLoading) {
    // content = <Loading />;
    content = (
      <Container>
        <Row>
          <Col md={12}>
            <div class="table">
              <div class="table__header">
                <h4>Teachers</h4>

                <select
                  name="department"
                  className=""
                  onChange={handleFilterDept}
                  id="filter_teacher_department_select"
                  required
                >
                  <option value="" defaultChecked>
                    Department
                  </option>
                  <option value="Mathmetics">Mathmatics</option>
                  <option value="English">English</option>
                  <option value="CSE">CSE</option>
                </select>
              </div>
              <section class="table__body">
                <div className="error_body">
                  <Loading />
                </div>
              </section>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  if (isError && !isLoading) {
    // content = <p>{error}</p>;
    content = (
      <Container>
        <Row>
          <Col md={12}>
            <div class="table">
              <div class="table__header">
                <h4>Teachers</h4>

                <select
                  name="department"
                  className=""
                  onChange={handleFilterDept}
                  id="filter_teacher_department_select"
                  required
                >
                  <option value="" defaultChecked>
                    Department
                  </option>
                  <option value="Mathmetics">Mathmatics</option>
                  <option value="English">English</option>
                  <option value="CSE">CSE</option>
                </select>
              </div>
              <section class="table__body">
                <div className="error_body">
                  {/* <BiError /> */}
                  <img src={netError} />
                  <span>{error}</span>
                </div>
              </section>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  if (!isError && !isLoading && accounts.length === 0) {
    content = <p>No teachers.</p>;
  }
  if (!isError && !isLoading && accounts.length > 0) {
    // content = <TableList teacher={filterTeacher}></TableList>;
    content = (
      <Container>
        <Row>
          <Col md={12}>
            <div class="table">
              <div class="table__header">
                <h4>Teachers</h4>

                <select
                  name="department"
                  className=""
                  onChange={handleFilterDept}
                  id="filter_teacher_department_select"
                  required
                >
                  <option value="" defaultChecked>
                    Department
                  </option>
                  <option value="Mathmetics">Mathmatics</option>
                  <option value="English">English</option>
                  <option value="CSE">CSE</option>
                </select>
              </div>
              <section class="table__body">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Email</th>
                      <th>Blood</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterTeacher.map((t) => (
                      <tr t={t} key={t._id}>
                        <td>{t.name}</td>
                        <td> {t.department}</td>
                        <td>{t.email} </td>
                        <td> {t.blood}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return <div>{content}</div>;
};

export default AllTeachers;
