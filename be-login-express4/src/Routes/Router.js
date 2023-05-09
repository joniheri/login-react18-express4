const express = require("express");
const router = express.Router();

// ==========================================================================
//  Import
// ==========================================================================
// Import AuthMiddleware
const { authMiddleware } = require("../Middleware/AuthMiddleware");

// Import UserController
const {
  testRun: testRunUser,
  getDatas: getDataUsers,
  getDataById: getDataUserById,
  addData: addDataUser,
} = require("../Controllers/UserController");

// Import AuthController
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../Controllers/AuthController");

// Import ProductController
const {
  getDatas: getDataProducts,
} = require("../Controllers/ProductController");
// ==========================================================================

// ==========================================================================
//  Route
// ==========================================================================
// Route AuthController
router.post("/register", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

// Route UserController
router.get("/testuser", testRunUser);
router.get("/users", getDataUsers);
router.get("/usersmidleware", authMiddleware, getDataUsers);
router.get("/user/:id", getDataUserById);
router.post("/adduser", addDataUser);

// Route ProductController
router.get("/products", getDataProducts);
router.get("/productsmiddleware", authMiddleware, getDataProducts);
// ==========================================================================

module.exports = router;
