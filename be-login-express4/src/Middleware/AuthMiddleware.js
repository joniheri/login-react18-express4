const { TbUser } = require("../../models");
const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  try {
    let header = req.header("Authorization");

    // Check header already exist
    if (!header) {
      return res.status(401).json({
        response: "fail",
        message: `Authorization Required.`,
      });
    }
    // End Check header already exist

    // Check Token in header is null
    if (header && header.split(" ")[1] == null) {
      return res.senStatus(401);
    }
    // End Check Token in header is null

    let token = header.replace("Bearer ", "");

    // Verify Token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).json({
          response: `fail`,
          message: error,
        });
      }

      // If Sucsess
      req.email = decoded.email;
      next();
      // End If Success
    });
    // End Verify Token
  } catch (error) {
    res.status(400).json({
      response: "fail",
      message: error,
    });
  }
};
