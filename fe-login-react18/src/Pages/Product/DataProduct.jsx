import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DataProduct() {
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    getDataProduct();
  }, []);

  const getDataProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/products");
      // console.log(response.data.data);
      setDataProducts(response.data.data);
    } catch (error) {
      // console.log(error);
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
