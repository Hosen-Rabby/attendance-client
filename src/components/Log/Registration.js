import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { HiMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
// import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../features/account/accountSlice";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shortPass, setShortPass] = useState("");
  const [cons, setCons] = useState("");
  const [mailExist, setMailExist] = useState(false);
  const [mailExistsms, setMailExistsms] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  console.log(email, password);

  const { accounts, isLoading, isError, error } = useSelector(
    (state) => state.accounts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);
  console.log(accounts);

  const { user, registerUser, authSuccess, authError } = useAuth();
  const filterIsRegisteredMail = accounts.filter(
    (indi) => indi.email === email
  );

  const emailCheck = (e) => {
    // setEmail(e.target.value);

    setMailExist(false);

    if (email === "") {
      setMailExist(false);
    }
    if (filterIsRegisteredMail.length === 0) {
      setMailExist(true);
      setEmail("");
      // setMailExistsms(true);
    } else {
      setMailExist(false);
      // setMailExistsms(false);
    }
  };
  let cant;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (filterIsRegisteredMail.length === 0) {
      cant = "cant";
    } else {
      if (password.length < 6) {
        setShortPass("Password must be 6 characters long!");
      } else {
        registerUser(email, password, location, navigate);
      }
    }
    setCons("Done");
  };

  return (
    <Container>
      {user?.uid && <Navigate to="/dashboard" replace={true} />}

      <div className="log_in">
        <h3>Register:</h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <HiMail />
            <input
              type="email"
              name="email"
              id=""
              // onBlur={emailCheck}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="field">
            <FiLock />
            <input
              type="password"
              name="passoword"
              id=""
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          {mailExist && <p>Contact with admin</p>}
          <button type="submit" className="submit_btn">
            Register
          </button>
          <div>
            Already have account?
            <Link to="/login"> Login</Link>
          </div>
        </form>
        {cons}
        {authSuccess && <p>Successfully registered.</p>}
        {shortPass}
        {cant}
        {/* {userError && <p>Enter correct email and password.</p>} */}
      </div>
    </Container>
  );
};

export default Registration;
