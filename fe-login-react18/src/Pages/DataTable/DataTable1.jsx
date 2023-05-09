import React, { useEffect, useState } from "react";
import { dataMobil } from "./Data";

export default function DataTable1() {
  const [dataMobilSortById, setDataMobilSortById] = useState([]);

  const dataMobilSort = async () => {
    await setDataMobilSortById(dataMobil.sort((a, b) => a.stok - b.stok));
  };

  useEffect(() => {
    dataMobilSort();
  }, []);

  return (
    <div className="container">
      <div className="mb-3">
        <h1>DataTable 1 -- Data Awal</h1>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-sm table-striped nowrap">
              <thead>
                <tr style={{ background: "#1E323D", color: "white" }}>
                  <th style={{ textAlign: "center", width: "100px" }}>No</th>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Stok</th>
                </tr>
              </thead>
              <tbody>
                {dataMobil.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ textAlign: "center", width: "100px" }}>
                        {index + 1}
                      </td>
                      <td>{item.id}</td>
                      <td>{item.category}</td>
                      <td>{item.productName}</td>
                      <td>{item.brand}</td>
                      <td>{item.stok}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <h1>DataTable 1 -- Data sort by ID</h1>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-sm table-striped nowrap">
              <thead>
                <tr style={{ background: "#1E323D", color: "white" }}>
                  <th style={{ textAlign: "center", width: "100px" }}>No</th>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Stok</th>
                </tr>
              </thead>
              <tbody>
                {dataMobilSortById.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ textAlign: "center", width: "100px" }}>
                        {index + 1}
                      </td>
                      <td>{item.id}</td>
                      <td>{item.category}</td>
                      <td>{item.productName}</td>
                      <td>{item.brand}</td>
                      <td>{item.stok}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
