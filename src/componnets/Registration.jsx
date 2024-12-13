import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "./APIHelper";

function Register({ onLoginLinkClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [conflictError, setConflictError] = useState("");
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
  const handleRegister = (event) => {
    console.log(event);
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    } else {
      setErrorMessage("");
    }

    const trimmedUsername = username.trim(); // Trim the username
    const trimmedPassword = password.trim();

    // Check if username contains whitespace
    if (/\s/.test(trimmedUsername)) {
      setUsernameError(
        "Username cannot contain whitespace. use underscope (_)."
      );
      return;
    }

    if (trimmedUsername.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
      return;
    } else {
      setUsernameError("");
    }

    if (trimmedPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    setUsernameError("");
    setPasswordError("");
    setErrorMessage("");
    setConflictError("");

    RegisterUser(trimmedUsername, trimmedPassword)
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
        console.error("Registration failed:", error.message);
        if (error.message === "Conflict") {
          setConflictError(
            "Username already exists. Please try a different one."
          );
        } else {
          console.error("Unexpected error:", error);
          setErrorMessage(
            "An unexpected error occurred. Please try again later."
          );
        }
      });
  };
  return (
    <div className="App">
      <div className="form-container">
        <h2>Register | Weather Report</h2>
        <form
          onSubmit={(event) => {
            handleRegister(event);
          }}
        >
          {" "}
          {/* Add form element with onSubmit handler */}
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
          <input
            className="forminput"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required="required"
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button className="formbutton" type="submit">
            {" "}
            {/* Remove onClick handler */}
            Register
          </button>
        </form>
        {conflictError && <p style={{ color: "red" }}>{conflictError}</p>}
        <p>
          Already have an account?{" "}
          <a href="/login" onClick={onLoginLinkClick}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
