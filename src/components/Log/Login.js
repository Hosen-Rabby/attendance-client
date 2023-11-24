import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { HiMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, authError, user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(email, password, location, navigate);
  };
  return (
    <Container>
      {user?.uid && <Navigate to="/dashboard" replace={true} />}
      <div className="log_in">
        <h3>Please log-in:</h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <HiMail />
            <input
              type="email"
              name="email"
              id=""
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="field">
            <FiLock />
            <input
              type="password"
              name="email"
              id=""
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="submit_btn">
            Sign In
          </button>
          <div>
            Don't have an account?
            <Link to="/registration"> Register</Link>
          </div>
        </form>
        {authError && <p className="error">{authError}</p>}
      </div>
    </Container>
  );
};

export default Login;
