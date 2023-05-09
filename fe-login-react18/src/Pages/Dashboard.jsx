import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function Dashboard() {
  const navigate = useNavigate();
  const axiosJWT = axios.create();

  const [token, setToken] = useState("");
  const [expireToken, setExpiredToken] = useState("");
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    refreshToken();
    getDataUsers();
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

  const getDataUsers = async () => {
    try {
      const response = await axiosJWT.get(
        "http://localhost:3001/api/usersmidleware",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      setDataUser(response.data.data);
    } catch (error) {
      console.log(`Error catch: `, error);
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <button onClick={getDataUsers} className="btn btn-success btn-sm">
        Get Data Users
      </button>
      <div className="row mt-3">
        <div className="col-md-12">
          <table className="table table-sm table-striped nowrap">
            <thead>
              <tr className="bg-dark text-white">
                <th className="text-center">No</th>
                <th>Email</th>
                <th>Username</th>
                <th>Fullname</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>{item.fullname}</td>
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
