import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallHeader from "../../../components/smallHeader/SmallHeader";
import axios from "axios";
import "./register.scss";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isFormValid = email && password && username;

  const handleUsernameChange = (e: { target: { value: string } }) => setUsername(e.target.value);
  const handleEmailChange = (e: { target: { value: string } }) => setEmail(e.target.value);
  const handlePasswordChange = (e: { target: { value: string } }) => setPassword(e.target.value);

  const handleRegister = async () => {
    if (isFormValid) {
      setError(null); 
      try {
        const response = await axios.post("http://localhost:8080/api/auth/register", {
          username: username,
          email: email,
          password: password,
        });

        if (response.status === 200) {
          navigate("/login");
        }
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data || "Something went wrong, please try again");
        } else {
          setError("Server error. Please try again later.");
        }
      }
    } else {
      setError("All fields are required");
    }
  };

  return (
    <>
      <SmallHeader isBlack={true} />
      <div className="register">
        <div className="register__container container">
          <div className="register__left">
            <div className="register__left-block">
              <h2 className="register__left-block-header">Get started quickly</h2>
              <h3 className="register__left-block-description">
                Start learning English words effortlessly with our easy-to-use app and personalized features.
              </h3>
            </div>

            <div className="register__left-block">
              <h2 className="register__left-block-header">Support any learning style</h2>
              <h3 className="register__left-block-description">
                Whether you're a beginner or looking to expand your vocabulary, Wordly offers tailored learning paths, quizzes, and flashcards to match your pace.
              </h3>
            </div>

            <div className="register__left-block">
              <h2 className="register__left-block-header">Join thousands of learners</h2>
              <h3 className="register__left-block-description">
                Wordly is trusted by individuals, language enthusiasts, and educators worldwide to improve their English vocabulary and language skills.
              </h3>
            </div>
          </div>

          <div className="register__right">
            <h1 className="register__right-title">Create your Wordly account</h1>

            <div className="register__right-inputs">
              <div>
                <span>Username</span>
                <input
                  type="text"
                  className="register__right-inputs-input"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <span>Email</span>
                <input
                  type="email"
                  className="register__right-inputs-input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <span>Password</span>
                <input
                  type="password"
                  className="register__right-inputs-input"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              {error ? <p className="error-active">{error}</p> : <p className="register__right-error"> - </p>}

              <input
                type="button"
                className={`register__right-inputs-input register__right-inputs-button ${!isFormValid ? "disabled" : ""}`}
                value="Create account"
                disabled={!isFormValid}
                onClick={handleRegister}
              />
            </div>

            <span className="register__right-bottom">
              Already have an account?&nbsp;<Link to="/login" className="link">Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
