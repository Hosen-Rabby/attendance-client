import React from "react";
import { Container } from "react-bootstrap";

const Routine = () => {
  return (
    <Container>
      <div className="routine">
        <div className="routine_table">
          <table>
            <thead>
              <tr>
                <td>Period</td>
                <td>Saturday</td>
                <td>Sunday</td>
                <td>Monday</td>
                <td>Tuesday</td>
                <td>Wednesday</td>
                <td>Thursday</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                  <input type="time" />
                  <p>To</p>
                  <input type="time" />
                  <input type="date" />
                  <br />
                </td>
                <td>
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                  <input type="time" />
                  <p>To</p>
                  <input type="time" />
                  <br />
                </td>
                <td>
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                  <input type="time" />
                  <p>To</p>
                  <input type="time" />
                  <br />
                </td>
                <td>
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                  <input type="time" />
                  <p>To</p>
                  <input type="time" />
                  <br />
                </td>
                <td>
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                  <input type="time" />
                  <p>To</p>
                  <input type="time" />
                  <br />
                </td>
                <td>
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                  <input type="time" />
                  <p>To</p>
                  <input type="time" />
                  <br />
                </td>
                <td>
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                  <input type="time" />
                  <p>To</p>
                  <input type="time" />
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Routine;





