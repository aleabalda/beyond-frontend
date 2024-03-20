import { useNavigate, Link } from "react-router-dom";
import "./StartPage.css";

function StartPage() {
  const nav = useNavigate();

  return (
    <div className="start-page-container">
      <div className="start-page-main">
        <h1 className="start-header">&#128640; Welcome to BEYOND &#128640;</h1>
        <div className="user-auth-buttons">
          <button className="home-auth-button" onClick={() => nav("/login")}>
            Login
          </button>
          <button className="home-auth-button" onClick={() => nav("/register")}>
            Register
          </button>
          <Link className="link" to="/home">
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
