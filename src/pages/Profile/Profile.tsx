import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LogoutButton from "../UserAuthentication/Login/LogoutButton";
import "./Profile.css";

function Profile() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pfp, setPfp] = useState<string>("");

  const { handleLogout } = useAuth();

  const getInfo = () => {
    setName(localStorage.getItem("Name") || "");
    setEmail(localStorage.getItem("Email") || "");
    setPfp(localStorage.getItem("PFP") || "");
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="profile-page">
        <div className="profile-image-and-links">
          <img src={pfp} alt="PFP" className="profile-pfp" />
        </div>
        <div className="profile-feilds">
          <form className="profile-form">
            <div className="profile-feild">
              <span>Name: </span>
              {name}
            </div>
            <div className="profile-feild">
            <span>Email: </span>
              {email}
            </div>
          </form>
          <button className="small-button">
            <Link to="/favourites" className="profile-link">
              Go to Favorites
            </Link>
          </button>
          <LogoutButton handleLogout={handleLogout} />
        </div>
      </div>
    </>
  );
}

export default Profile;
