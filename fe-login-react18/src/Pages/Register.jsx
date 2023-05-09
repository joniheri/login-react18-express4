import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [message, setMessage] = useState("");
  const [responseApi, setResponseApi] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        fullname: fullname,
      });
      if (!response) {
        return setMessage("REGISTER FAIL");
      }
      if (password !== confirmPassword) {
        return setMessage("Password Not Match");
      }
      setEmail("");
      setUsername("");
      setFullname("");
      setPassword("");
      setConfirmPassword("");
      setResponseApi(response.data.response);
      setMessage("REGISTER SUCCESS");
    } catch (error) {
      // console.log(`Error`, error.response.data);
      setResponseApi(error.response.data.response);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ marginTop: "80px", marginBottom: "80px" }}>
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              {responseApi === "fail" ? (
                <div className="alert alert-danger text-center">{message}</div>
              ) : responseApi === "success" ? (
                <div className="alert alert-success text-center">{message}</div>
              ) : (
                ""
              )}
              <h1 className="text-center">Register</h1>
              <form onSubmit={handleRegister} className="mt-4">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Fullname</label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={fullname}
                    onChange={(e) => {
                      setFullname(e.target.value);
                    }}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm me-3 w-100"
                  >
                    Register
                  </button>
                </div>
                <div className="mb-3">
                  <span>
                    Already have an account,{" "}
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Login here
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}
