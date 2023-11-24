import React, { useEffect } from "react";
import Students from "../components/Students/Students";
import AllStudents from "../components/All/AllStudents";
import Sidebar from "../components/Sidebar/Sidebar";
import AddTeacher from "../components/Add/AddTeacher";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../features/account/accountSlice";
import AddStudent from "../components/Add/AddStudent";

const StudentsPage = () => {
  const sidebarId = 3;
  const { user } = useAuth();
  const { accounts, isLoading, isError, error } = useSelector(
    (state) => state.accounts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);
  const filterAccount = accounts.filter((a) => a.email === user?.email);
  return (
    <div>
      <div className="students page">
        <Sidebar sidebarId={sidebarId} />
        <div className="right_content">
          <AllStudents />
          {filterAccount[0]?.admin === true && <AddStudent />}
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
