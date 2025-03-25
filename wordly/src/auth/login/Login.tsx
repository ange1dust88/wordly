import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallHeader from "../../smallHeader/SmallHeader";
import './login.scss';
import axios from "axios";
import { useAuthStore } from "../../Stores/useAuthStore";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async () => {
    if (username && password) {
      setError(null);
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/token/", {
          username,
          password,
        });

        login(response.data.access, response.data.refresh, username);

        if (rememberMe) {
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
        } else {
          sessionStorage.setItem("access", response.data.access);
          sessionStorage.setItem("refresh", response.data.refresh);
        }

        navigate("/dashboard");
      } catch (error) {
        setError("Invalid credentials, please try again.");
      }
    } else {
      setError("Both fields are required");
    }
  };

  const loginViaGithub = async (event: React.MouseEvent) => {
    event.preventDefault(); 
    try {
      window.location.href = "http://127.0.0.1:8000/accounts/github/login/";
    } catch (error) {
      setError("An error occurred while logging in via GitHub.");
      console.error("GitHub login error:", error);
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

            <div className="login__box-inputs-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <p> Remember me on this device</p>
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
              className="login__box-inputs-input login__box-inputs-social"
              onClick={loginViaGithub}>
                <img src='github-logo.png'/>Login with github
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