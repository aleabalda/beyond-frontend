import React, { useState, useEffect } from "react";
// @ts-ignore
import Video from "./galaxy.mp4";
import LoginButton from "./LoginButton";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const { handleLogin } = useAuth();

  useEffect(() => {
    setErrMessage("");
  }, [user, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mainbg">
      <video className="login-video" src={Video} autoPlay loop muted />
      <div className="overlay"></div>
      <section className="login-form-content">
        <p
          className={errMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMessage}
        </p>
        <h1 className="login-header">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="login-input"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label className="password-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button
            className="login-button"
            onClick={() => {
              handleLogin();
            }}
          >
            Log In
          </button>
          <div className="google-buttons">
            <LoginButton handleLogin={handleLogin} />
          </div>
          <div className="register-link">
            <p>Don't have an account?</p>
            <Link to="/register">Register here.</Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;