import React from "react";
import { Routes as ReactRoutes, Route, Router } from "react-router-dom";

// Pages
import PageNotFound from "./Pages/PageNotFound";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";
import Home from "./Pages/Home";
import DataProduct from "./Pages/Product/DataProduct";
import DataProductWithToken from "./Pages/Product/DataProductWithToken";

export default function Routes() {
  return (
    <>
      <ReactRoutes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/Home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/About"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />
        <Route path="/product">
          <Route
            path="dataproduct"
            element={
              <>
                <Navbar />
                <DataProduct />
              </>
            }
          />
          <Route
            path="dataproductwithauth"
            element={
              <>
                <Navbar />
                <DataProductWithToken />
              </>
            }
          />
        </Route>
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
      </ReactRoutes>
    </>
  );
}
