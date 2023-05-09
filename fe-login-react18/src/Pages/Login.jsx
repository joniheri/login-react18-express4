import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [responsApi, setResponApi] = useState("");
  const [message, setMessage] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  // console.log(emailInput);

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email: emailInput,
        password: passwordInput,
      });
      // console.log(response);
      setResponApi("");
      setMessage("");
      navigate("/dashboard");
    } catch (error) {
      // console.log(`Error catch: `, error);
      setResponApi(error.response.data.response);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ marginTop: "80px" }}>
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              {responsApi !== "" && responsApi === "fail" ? (
                <div className="alert alert-danger text-center">{message}</div>
              ) : responsApi !== "" && responsApi === "success" ? (
                <div className="alert alert-success text-center">{message}</div>
              ) : (
                ""
              )}
              <h1 className="text-center">Login</h1>
              <form onSubmit={handelLogin} className="mt-4">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
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
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                    }}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-success btn-sm me-3 w-100">
                    Login
                  </button>
                </div>
                <div className="mb-3">
                  <span>
                    Don't have account,{" "}
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      Register here
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
