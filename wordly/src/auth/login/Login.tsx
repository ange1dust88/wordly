import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallHeader from "../../smallHeader/SmallHeader";
import { GoogleLogin } from '@react-oauth/google';
import './login.scss';
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleLogin = async () => {
    if (username && password) {
      setError(null);
      try {
        const csrfToken = Cookies.get('csrftoken'); 

        const response = await fetch("http://127.0.0.1:8000/users/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || '', 
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        if (response.ok) {
          navigate("/dashboard");
        } else {
          const data = await response.json();
          setError(data.detail || "Invalid credentials");
        }
      } catch (error) {
        setError("Network error, please try again later");
      }
    } else {
      setError("Both fields are required");
    }
  };

  const handleGoogleSuccess = async (response: any) => {
    if (response.credential) {
      try {
        const res = await fetch("http://127.0.0.1:8000/accounts/google/login/callback/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken') || '', 
          },
          credentials: 'include',
          body: JSON.stringify({ token: response.credential }),
        });
  
        if (res.ok) {
          navigate("/dashboard");
        } else {
          const data = await res.json();
          setError(data.detail || "Something went wrong!");
        }
      } catch (error) {
        setError("Network error, please try again later");
      }
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
              <input type="checkbox" />
              <p> Remember me on this device</p>
            </div>

            {error ? (
                <p className='error-active'>{error}</p>
              ) : (
                <p className='login__box-error'> - </p>
              )}

            <input
              type="button"
              className="login__box-inputs-input login__box-inputs-button"
              value="Sign in"
              onClick={handleLogin}
            />

            <p className="login__box-inputs-border">or</p>

            <GoogleLogin
              onSuccess={handleGoogleSuccess}      
            />
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