// src/components/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import the CSS file
import "bootstrap/dist/css/bootstrap.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your authentication logic here
    if (username === "admin" && password === "password") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="left-half">
        <center>
          <div className="image-container">
            <img src="ccs_logo.png" alt="Logo" />
          </div>
        </center>
        <center>
          <div className="learn-code-collaborate">
            <div class="container text-center">
              <div class="row">
                <div class="col">Learn</div>
                <div class="col">Code</div>
                <div class="col">Collaborate</div>
              </div>
            </div>
          </div>
        </center>
      </div>
      <div className="right-half">
        <h2>Login Page</h2> {/* Moved "Login Page" text above the form */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;