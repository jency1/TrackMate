import "../styles/App.css";
import { useState } from "react";
import { FaUserAlt, FaSignInAlt, FaUserPlus, FaLock } from "react-icons/fa";
import {
  isUsernameTaken,
  registerUsername,
  isPasswordValid,
} from "../utils/localStorage";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedPassword) {
      setError("❌ Both fields are required.");
      return;
    }

    if (isRegistering) {
      if (isUsernameTaken(trimmedName)) {
        setError("❌ Username already exists. Please choose another.");
        return;
      }
      registerUsername(trimmedName, trimmedPassword);
    } else {
      if (!isUsernameTaken(trimmedName)) {
        setError("❌ No such user found. Please register first.");
        return;
      }
      if (!isPasswordValid(trimmedName, trimmedPassword)) {
        setError("❌ Incorrect password.");
        return;
      }
    }

    // Valid login - store current logged in user
    localStorage.setItem("tasks_current_user", trimmedName);
    onLogin(trimmedName);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <FaUserAlt className="login-icon" />
          <h1>TrackMate</h1>
        </div>
        <h2>
          {isRegistering ? "Register a new user" : "Login to your account"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="input-group">
            <FaUserAlt className="input-icon" />
            <input
              type="text"
              value={name}
              placeholder="Enter your name..."
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              value={password}
              placeholder="Enter your password..."
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit">
            {isRegistering ? (
              <>
                <FaUserPlus style={{ marginRight: "8px" }} />
                Register
              </>
            ) : (
              <>
                <FaSignInAlt style={{ marginRight: "8px" }} />
                Login
              </>
            )}
          </button>
        </form>

        <div className="toggle-auth">
          {isRegistering ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  setIsRegistering(false);
                  setError("");
                  setPassword("");
                }}
              >
                Login here
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  setIsRegistering(true);
                  setError("");
                  setPassword("");
                }}
              >
                Register here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
