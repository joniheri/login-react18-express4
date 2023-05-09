const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = 3001;

const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://otherdomain.com"],
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Import Routes
const router = require("./src/Routes/Router");

// =========================================================
// Routing
// =========================================================

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

// =========================================================
// End Routing
// =========================================================
