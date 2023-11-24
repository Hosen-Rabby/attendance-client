import React, { useEffect } from "react";
import { MdDashboard, MdFlightClass } from "react-icons/md";
import { BsPenFill } from "react-icons/bs";
import { FaObjectGroup, FaPeopleGroup } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiFillSound, AiOutlineFundView } from "react-icons/ai";
import { AiFillSchedule } from "react-icons/ai";

import { Link } from "react-router-dom";
import hosen from "../../assets/download.png";
import { Container } from "react-bootstrap";
import { BiLogoDiscourse } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../features/account/accountSlice";

const Sidebar = ({ sidebarId }) => {
  const { user } = useAuth();
  const { accounts, isLoading, isError, error } = useSelector(
    (state) => state.accounts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const filterAccount = accounts.filter((a) => a.email === user?.email);

  const filterTeacher = accounts.filter((a) => a.teacher == true);
  const filterStudents = accounts.filter((a) => a.student == true);
  const filterAdmin = accounts.filter((a) => a.admin == true);
  return (
    <div className="sidebar">
      <div className="profile">
        <div className="profile_img">
          <img src={hosen} alt="" />
        </div>
        <div className="profile_name">
          <p>{filterAccount[0]?.name}</p>
          <h6>
            {filterAccount[0]?.teacher === true && (
              <p className="roole">Teacher</p>
            )}
          </h6>
          <h6>
            {filterAccount[0]?.admin === true && <p className="roole">Admin</p>}
          </h6>
          <h6>
            {filterAccount[0]?.student === true && (
              <p className="roole">Student</p>
            )}
          </h6>
        </div>
        <div className="pen">{/* <BsPenFill /> */}</div>
      </div>
      <div className="navigation">
        <div className="menu">
          {filterAccount[0]?.student === true && (
            <span>
              <Link
                to="/dashboard"
                className={sidebarId === 1 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <MdDashboard />
                </div>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/teachers"
                className={sidebarId === 2 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <FaChalkboardTeacher />
                </div>
                <span>Teachers</span>
              </Link>
              <Link
                to="/students"
                className={sidebarId === 3 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <FaPeopleGroup />
                </div>
                <span>Students</span>
              </Link>

              <Link
                to="/routine"
                className={sidebarId === 5 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <AiFillSchedule />
                </div>
                <span>Routine</span>
              </Link>

              {/* <Link
                to="/attendance"
                className={sidebarId === 6 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <MdFlightClass />
                </div>
                <span>Attendance</span>
              </Link> */}
              {/* <Link
                to="/view"
                className={sidebarId === 7 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <AiOutlineFundView />
                </div>
                <span>View</span>
              </Link> */}
              {/* 
              <Link
                to="/include"
                className={sidebarId === 10 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <BiLogoDiscourse />
                </div>
                <span>include</span>
              </Link> */}
            </span>
          )}
          {filterAccount[0]?.teacher === true && (
            <span>
              <Link
                to="/dashboard"
                className={sidebarId === 1 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <MdDashboard />
                </div>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/teachers"
                className={sidebarId === 2 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <FaChalkboardTeacher />
                </div>
                <span>Teachers</span>
              </Link>
              <Link
                to="/students"
                className={sidebarId === 3 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <FaPeopleGroup />
                </div>
                <span>Students</span>
              </Link>

              <Link
                to="/routine"
                className={sidebarId === 5 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <AiFillSchedule />
                </div>
                <span>Routine</span>
              </Link>

              <Link
                to="/attendance"
                className={sidebarId === 6 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <MdFlightClass />
                </div>
                <span>Attendance</span>
              </Link>
              <Link
                to="/view"
                className={sidebarId === 7 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <AiOutlineFundView />
                </div>
                <span>View</span>
              </Link>
              {/* 
              <Link
                to="/include"
                className={sidebarId === 10 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <BiLogoDiscourse />
                </div>
                <span>include</span>
              </Link> */}
            </span>
          )}
          {filterAccount[0]?.admin === true && (
            <span>
              <Link
                to="/dashboard"
                className={sidebarId === 1 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <MdDashboard />
                </div>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/teachers"
                className={sidebarId === 2 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <FaChalkboardTeacher />
                </div>
                <span>Teachers</span>
              </Link>
              <Link
                to="/students"
                className={sidebarId === 3 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <FaPeopleGroup />
                </div>
                <span>Students</span>
              </Link>

              <Link
                to="/routine"
                className={sidebarId === 5 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <AiFillSchedule />
                </div>
                <span>Routine</span>
              </Link>

              {/* <Link
                to="/attendance"
                className={sidebarId === 6 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <MdFlightClass />
                </div>
                <span>Attendance</span>
              </Link>
              <Link
                to="/view"
                className={sidebarId === 7 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <AiOutlineFundView />
                </div>
                <span>View</span>
              </Link> */}

              <Link
                to="/include"
                className={sidebarId === 10 ? "menu_link active" : "menu_link"}
              >
                <div className="highlight"></div>
                <div className="menu_i">
                  <BiLogoDiscourse />
                </div>
                <span>include</span>
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
