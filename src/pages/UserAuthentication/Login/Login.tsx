import React, { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { userLoginData } from "../../../utils/dataClasses";
import { loginUser } from "../../../utils/userController";
import "./Login.css";
import pfp_placeholder from "../../../assets/images/pfp_placeholder.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setErrMessage("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    let userData : userLoginData = {
      email: email,
      password: password,
      isGoogle: false
    }



    const res = await loginUser(userData);
    console.log(res);
    if (res["error"]) {
      setErrMessage(res["error"]);
      return;
    }

    localStorage.setItem("Email", email);
    localStorage.setItem("Name", res["username"]);
    localStorage.setItem("PFP", pfp_placeholder);
    sessionStorage.setItem("isLoggedIn", 'true');

    navigate('/');
  };

  return (
    <div className="mainbg">
      <section className="login-form-content">
        <p
          className={errMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMessage}
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-header">Login</h1>
          <label className="login-form-label" htmlFor="username">
            Email:
          </label>
          <input
            type="email"
            id="username"
            className="login-input"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label className="login-form-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            value={password}
            required
          />
          <div className="login-buttons-container">
            <button
              className="login-button"
              onClick={() => {
                handleLogin();
              }}
            >
              Log In
            </button>
            <LoginButton handleLogin={handleLogin} />
          </div>
          <div className="register-links">
            <p>Don't have an account?</p>
            <Link className="register-route" to="/register">
              Register here.
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
