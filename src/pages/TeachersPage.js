import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import AddTeacher from "../components/Add/AddTeacher";
import { Container } from "react-bootstrap";
import AllTeachers from "../components/All/AllTeachers";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../features/account/accountSlice";

const TeachersPage = () => {
  const { user } = useAuth();
  const { accounts, isLoading, isError, error } = useSelector(
    (state) => state.accounts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);
  const sidebarId = 2;
  const filterAccount = accounts.filter((a) => a.email === user?.email);
  return (
    <div className="teachers page">
      <Sidebar sidebarId={sidebarId} />
      <div className="right_content">
        <AllTeachers />
        {filterAccount[0]?.admin === true && <AddTeacher />}
      </div>
    </div>
  );
};

export default TeachersPage;
