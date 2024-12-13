import React, { useState, useEffect } from "react";
import "../App.css";
import Register from "./Registration";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "./APIHelper";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [unAuthError, setunAuthError] = useState("");
  const navigate = useNavigate();

  // prevent user to going back
  useEffect(() => {
    // First check localStorage contain token, if not then redirect to login page

    //
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }, []);
  const handleLogin = (event) => {
    console.log(event);
    event.preventDefault(); // Prevent form submission
    // Trim the input to remove leading and trailing whitespaces
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Check if username or password is empty after trimming
    if (trimmedUsername === "" || trimmedPassword === "") {
      console.error("Username or password cannot be empty.");
      setUsernameError("Username is required.");
      setPasswordError("Password is required.");
      return; // Exit the function if username or password is empty
    }
    setUsernameError("");
    setPasswordError("");
    setunAuthError(""); // Clear previous unAuthError if any
    // Implement your login logic here
    // console.log("Logging in with:", trimmedUsername, trimmedPassword);
    LoginUser(trimmedUsername, trimmedPassword)
      .then((token) => {
        if (token) {
          // Token retrieval successful,
          // console.log("Token:", token);
          localStorage.setItem("token", token);
          navigate(
            `/dashboard?username=${encodeURIComponent(trimmedUsername)}`,
            {
              state: token,
            }
          );
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        // Error handling if login fails
        console.error("Login failed:", error.message);
        if (error.message === "Unauthorized") {
          setunAuthError("Invalid Username or Password");
        }
      });
  };
  return (
    <div className="App">
      <div className="form-container">
        <form onSubmit={(event) => handleLogin(event)}>
          <h2>Login | Weather Report</h2>
          <input
            className="forminput"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required="required"
          />
          {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
          <input
            className="forminput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required="required"
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <button className="formbutton" type="submit">
            Login
          </button>
          {unAuthError && <p style={{ color: "red" }}>{unAuthError}</p>}
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
