import React from "react";

export default function PageNotFound() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Page Not Found</h1>
    </div>
    // <div
    //   style={{
    //     display: "flex",
    //     justifyItems: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <h1 style={{ textAlign: "center" }}>Page Not Found</h1>
    // </div>
  );
}
