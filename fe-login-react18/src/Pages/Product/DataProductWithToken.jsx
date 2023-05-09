import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DataProductWithToken() {
  const navigate = useNavigate();
  const axiosJWT = axios.create();

  const [token, setToken] = useState("");
  const [expireToken, setExpiredToken] = useState("");
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    refreshToken();
    getDataProduct();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/token");
      // console.log(`Success try: `, response);
      // console.log(jwtDecode(response.data.accessToken));
      setToken(response.data.accessToken);
      const decodeToken = jwtDecode(response.data.accessToken);
      setExpiredToken(decodeToken.exp);
    } catch (error) {
      // console.log(`Error catch: `, error);
      if (error.response) {
        navigate("/");
      }
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expireToken * 100 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:3001/api/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decodeToken = jwtDecode(response.data.accessToken);
        setExpiredToken(decodeToken.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getDataProduct = async () => {
    try {
      const response = await axiosJWT.get(
        "http://localhost:3001/api/productsmiddleware",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      setDataProducts(response.data.data);
    } catch (error) {
      console.log(`Error get data: `, error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row d-flex mb-2">
        <div className="col-md-8 me-auto">
          <h1>DataProduct</h1>
        </div>
        <div className="col-md-4 ms-auto">
          <div className=" mt-3 d-flex">
            <input type="text" className="me-2 form-control form-control-sm" />
            <Link to="/product/addproduct" className="btn btn-success btn-sm">
              Tambah
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-sm table-striped nowrap">
            <thead>
              <tr style={{ background: "#1E323D", color: "white" }}>
                <th style={{ textAlign: "center" }}>No</th>
                <th>Kategory</th>
                <th>Nama Produk</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
              {dataProducts.map((item, index) => {
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td>{item.category}</td>
                    <td>{item.productName}</td>
                    <td>{item.productBrand}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
