import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { loginUser} from '../../../utils/userController';
import { userLoginData } from '../../../utils/dataClasses';
import { useNavigate } from "react-router-dom";

interface LoginButtonProps {
  handleLogin: () => void;
}

function LoginButton({ handleLogin }: LoginButtonProps) {

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Successfully Logged In!', tokenResponse);

      const accessToken = tokenResponse.access_token;

      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userProfile = res.data;
        window.localStorage.setItem("Email", userProfile.email);
        window.localStorage.setItem("Name", userProfile.name);
        window.localStorage.setItem("PFP", userProfile.picture);

        let userData : userLoginData = {
          email: userProfile.email,
          password: "google",
          isGoogle: true
        }


        let apiRes: String = await loginUser(userData);
        console.log(apiRes);

        handleLogin();
        sessionStorage.setItem("isLoggedIn", 'true');
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    },
    onError: error => {
      console.log('Login failed! Please try again (womp womp). Error: ', error);
    }
  });

  return (
    <>
      <div className="flex-body">
        <button id="custom-btn" onClick={() => login()}>
          <span className="button-text">Sign in with Google </span>
          <span className="google-icon"></span>
        </button>
      </div>
    </>
  );
}

export default LoginButton;
