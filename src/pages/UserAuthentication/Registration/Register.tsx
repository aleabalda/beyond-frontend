import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./Register.css";
import { userRegisterData } from "../../../utils/dataClasses";
import { registerUser } from "../../../utils/userController";
import GoogleButton from "./GoogleButton";

interface RegisterProps {
  onRegister: (userRegisterData: userRegisterData) => void;
}

function RegistrationForm({ onRegister }: RegisterProps) {
  const { handleLogin } = useAuth();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: userRegisterData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      isGoogle: false,
    };

    let apiRes = await registerUser(userData);
    console.log(apiRes.error);

    if (apiRes["error"]) {
      console.log("Error with registration");
      return;
    }

    onRegister(userData);
    handleLogin();

    navigateToHome();
  };

  const navigateToHome = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="registration-form-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <h1 className="register-header">Create an Account</h1>
          <div className="fields">
            <div className="left">
              <label className="reg-label" htmlFor="first-name">
                First Name:
              </label>
              <input
                className="reg-input"
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                pattern="[A-Z]?[a-z]+"
                required
              />
              <label className="reg-label" htmlFor="username">
                Username:
              </label>
              <input
                className="reg-input"
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="reg-label" htmlFor="email">
                Email:
              </label>
              <input
                className="reg-input"
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="right">
              <label className="reg-label" htmlFor="last-name-field">
                Last Name:
              </label>
              <input
                className="reg-input"
                id="last-name-field"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                pattern="[A-Z]?[a-z]+"
                required
              />
              <label className="reg-label" htmlFor="password">
                Password:
              </label>
              <input
                className="reg-input"
                id="password"
                type="password"
                autoComplete="new-password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div id="reg-links-group">
            <button className="register-button" type="submit">
              Register
            </button>
            <GoogleButton handleRegister={handleLogin} />
          </div>
          <div className="login-links">
            <p>Already a user?</p>
            <Link to="/login" className="login-route">
              Login here.
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;
