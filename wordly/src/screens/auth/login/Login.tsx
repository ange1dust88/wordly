import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallHeader from "../../../components/smallHeader/SmallHeader";
import './login.scss';
import axios from "axios";
import useUserStore from "@/store/userStore"; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleLogin = async () => {
    if (username && password) {
      setError(null);
      try {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
          username,
          password
        });

        if (response.status === 200) {
          await fetchUserInfo(username);
          navigate("/dashboard");
        }
      } catch (error: any) {
        setError("Invalid credentials, please try again.");
      }
    } else {
      setError("Both fields are required");
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("Received origin:", event.origin);
      if (event.origin !== "http://localhost:8080") {
        console.log("Received message from invalid origin:", event.origin);
        return;
      }

      if (event.data) {
        console.log("Received user data:", event.data); 
        setUser(event.data); 
        navigate("/dashboard"); 
      } else {
        console.log("No data received in event:", event);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setUser, navigate]);


  const handleGithubLogin = () => {
    const popup = window.open(
      "http://localhost:8080/oauth2/authorization/github",
      "_blank",
      "width=500,height=600"
    );

    const timer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(timer);
      }
    }, 500);
  };



  const fetchUserInfo = async (username:string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${username}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching users");
    }
  };

  return (
    <>
      <SmallHeader isBlack={false} />

      <div className="login">
        <form className="login__box">
          <h1 className="login__box-title">Sign in to your account</h1>
          <div className="login__box-inputs">
            <div>
              <span>Username</span>
              <input
                type="text"
                className="login__box-inputs-input"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <span>Password</span>
              <input
                type="password"
                className="login__box-inputs-input"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {error ? (
              <p className="error-active">{error}</p>
            ) : (
              <p className="login__box-error"> - </p>
            )}

            <input
              type="button"
              className="login__box-inputs-input login__box-inputs-button"
              value="Sign in"
              onClick={handleLogin}
            />

            <p className="login__box-inputs-border">or</p>

            <button 
              onClick={handleGithubLogin}
              className="login__box-inputs-social">
                <img src="github-logo.png"/>
              Sign in with GitHub
            </button>
          </div>

          <span className="login__box-bottom">
            New to Wordly?&nbsp;
            <Link to='/register' className="link">
              Create account
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;
