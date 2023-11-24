import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = weekday[d.getDay()];

  const currentDate = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(currentDate);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to update the time
  const updateTime = () => {
    setCurrentTime(new Date());
  };

  // Initial update of time
  useEffect(() => {
    updateTime();

    // Set up an interval to update the time every second (1000 milliseconds)
    const intervalId = setInterval(updateTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return (
    <div className="nav_bar">
      <Container fluid>
        <Row>
          <Col>
            <div className="logo">
              <h2>EduSync</h2>
            </div>
          </Col>

          <Col>
            <div className="day_date">
              <h4>{day}</h4>
              <p>
                {formattedDate} | <span>{formattedTime}</span>
              </p>
            </div>
          </Col>
          <Col>
            <div className="other">
              {user?.uid ? (
                <span onClick={logOut} className="log_out">
                  {/* <RiLogoutBoxRFill /> */}
                  Logout
                </span>
              ) : (
                // <Link to="/login">Login</Link>
                <p>Welcome</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBar;
