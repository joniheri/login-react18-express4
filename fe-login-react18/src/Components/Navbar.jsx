import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("http://localhost:3001/api/logout");
      if (!response) {
        return console.log("Logout FAIL");
      }
      navigate("/");
    } catch (error) {
      console.log(`Error catch`, error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#1E323D" }}
    >
      <div className="container">
        <Link to="/dashboard" className="navbar-brand text-uppercase fw-bold">
          E-Commers
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link active"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Product
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/product/dataproduct" className="dropdown-item">
                    Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product/dataproductwithauth"
                    className="dropdown-item"
                  >
                    Product With Token
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" title="Keranjang">
                <i
                  className="fa fa-shopping-cart"
                  style={{ fontSize: "20px" }}
                ></i>
              </Link>
            </li> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hello, Jon Heri
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="dropdown-item">
                    Settings
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
