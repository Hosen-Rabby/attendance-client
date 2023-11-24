import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const TableList = ({ teacher }) => {

  return (
    <Container>
      <Row>
        {/* <div className="col-lg-12 grid-margin stretch-card"> */}
        <Col md={12}>
          <div class="table">
            <div class="table__header">
              <h4>Teachers</h4>
              {/* <div class="input-group"> */}
              {/* <input type="search" placeholder="Search Data..."> */}
              {/* <img src="images/search.png" alt=""> */}
              {/* </div> */}
              {/* <div class="export__file">
                <label for="export-file" class="export__file-btn" title="Export File"></label>
                <input type="checkbox" id="export-file">
                <div class="export__file-options">
                    <label>Export As &nbsp; &#10140;</label>
                    <label for="export-file" id="toPDF">PDF <img src="images/pdf.png" alt=""></label>
                    <label for="export-file" id="toJSON">JSON <img src="images/json.png" alt=""></label>
                    <label for="export-file" id="toCSV">CSV <img src="images/csv.png" alt=""></label>
                    <label for="export-file" id="toEXCEL">EXCEL <img src="images/excel.png" alt=""></label>
                </div>
            </div> */}
              {/* <select
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
              </select> */}
            </div>
            <section class="table__body">
              <table>
                <thead>
                  <tr>
                    {/* <th>Id</th> */}
                    <th>Name</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Blood</th>
                    {/* <th>Amount</th> */}
                  </tr>
                </thead>
                <tbody>
                  {teacher.map((t) => (
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
};

export default TableList;
