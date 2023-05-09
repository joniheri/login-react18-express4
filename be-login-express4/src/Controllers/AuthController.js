const { TbUser } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.testRun = (req, res) => {
  return res.json({
    response: "success",
    message: "Response SUCCESS",
  });
};

exports.register = async (req, res) => {
  try {
    const { body } = req;

    // Validation Input
    const validator = joi.object({
      email: joi.string().email().min(4).required(),
      username: joi.string().min(4).required(),
      password: joi.string().min(4).required().label("Password"),
      confirmPassword: joi
        .any()
        .equal(joi.ref("password"))
        .required()
        .label("Confirm Password")
        .messages({ "any.only": "{{#label}} does not match" }),
      fullname: joi.string().min(4).required(),
    });
    const { error } = validator.validate(body);
    if (error) {
      return res.status(422).json({
        response: "fail",
        message: error.details[0].message,
      });
    }
    if (body.password !== body.confirmPassword) {
      return res.status(400).json({
        response: "fail",
        message: `Password and Confirm Password Not Match`,
      });
    }
    // End Validation Input

    // Check Email already exist
    const checkEmailAlreadyExist = await TbUser.findOne({
      where: {
        email: body.email,
      },
    });
    if (checkEmailAlreadyExist) {
      return res.status(422).json({
        response: "fail",
        message: `User with email: ${body.email} Already Exist`,
      });
    }
    // Check Email already exist

    // Hashing Password
    const hashPassword = await bcrypt.hash(body.password, 10);

    // Process Register or Insert data to database
    const insertData = await TbUser.create({
      id: uuidv4(),
      email: body.email,
      username: body.username,
      password: hashPassword,
      fullname: body.fullname,
    });
    if (!insertData) {
      return res.status(422).json({
        response: "fail",
        message: `Add data FAIL`,
      });
    }
    // End Process Register or Insert data to database

    return res.json({
      response: "success",
      message: "Register SUCCESS",
      dataInput: body,
    });
  } catch (error) {
    return res.status(4004).json({
      response: "fail",
      message: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { body } = req;

    // Validate Input
    const validator = joi.object({
      email: joi.string().email().min(5).required(),
      password: joi.string().min(5).required(),
    });
    const { error } = validator.validate(body);
    if (error) {
      return res.status(422).send({
        response: "fail",
        message: `${error.details[0].message}`,
        data: body,
      });
    }
    // End Validate Input

    // Cek Data By Email in Database
    const getUserByEmail = await TbUser.findOne({
      where: {
        email: body.email,
      },
    });
    if (!getUserByEmail) {
      return res.status(400).send({
        response: "fail",
        message: `Email Not Found`,
      });
    }
    // End Cek Data By Email in Database

    // Compare Password agar bisa login
    const matchPassword = await bcrypt.compare(
      body.password,
      getUserByEmail.password
    );
    if (!matchPassword) {
      return res.status(400).json({
        response: "fail",
        message: `Wrong Password!`,
      });
    }
    // End Compare Password agar bisa login

    // Make accessToken
    const accessToken = jwt.sign(
      {
        id: getUserByEmail.id,
        email: getUserByEmail.email,
        username: getUserByEmail.username,
        fullname: getUserByEmail.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: `20s`,
      }
    );
    // End Make accessToken

    // Make refreshToken
    const refreshToken = jwt.sign(
      {
        id: getUserByEmail.id,
        email: getUserByEmail.email,
        username: getUserByEmail.username,
        fullname: getUserByEmail.fullname,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: `1d`,
      }
    );
    // End Make refreshToken

    // Update field refreshToken in table user
    await TbUser.update(
      {
        refreshToken: refreshToken,
      },
      {
        where: {
          id: getUserByEmail.id,
        },
      }
    );
    // End Update field refreshToken in table user

    // Make Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure:true //--> use this if using https
    });
    // End Make Cokie

    // Login Success
    return res.send({
      response: "success",
      message: `Login SUCCESS`,
      accessToken,
    });
    // Login Success
  } catch (error) {
    return res.status(404).send({
      response: "fail",
      message: error,
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { cookies } = req;

    //Cek refreshToken Already exist
    if (!cookies.refreshToken) {
      return res.status(401).json({
        response: "fail",
        message: `Authorization Required. Please login again.`,
      });
    }
    //End Cek refreshToken Already exist

    // Get user where refreshToken = cookies.refreshToken
    const getUsersByRefreshToken = await TbUser.findOne({
      where: {
        refreshToken: cookies.refreshToken,
      },
    });
    if (!getUsersByRefreshToken) {
      return res.status(403).json({
        response: `fail`,
        message: `Refresh Token Not Match. Please login again.`,
      });
    }
    // Get user where refreshToken = cookies.refreshToken

    // Verify Token
    jwt.verify(
      getUsersByRefreshToken.refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          return res.status(403).json({
            response: `fail`,
            message: error,
          });
        }

        // If Success, Make New accessToken
        const accessToken = jwt.sign(
          {
            id: getUsersByRefreshToken.id,
            email: getUsersByRefreshToken.email,
            username: getUsersByRefreshToken.username,
            fullname: getUsersByRefreshToken.fullname,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: `20s`,
          }
        );
        // End If Success, Make New accessToken

        // If success
        return res.json({
          response: `success`,
          accessToken,
        });
        // End If success
      }
    );
    // End Verify Token
  } catch (error) {
    return res.status(404).send({
      response: "fail",
      message: error,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const { cookies } = req;

    // Cek refreshToken from cookies
    if (!cookies.refreshToken) {
      return res.status(204).send({
        response: "fail",
        message: `Logout FAIL`,
      });
    }
    // End Cek refreshToken from cookies

    // Cek User By refreshToken
    const getUserByRefreshToken = await TbUser.findOne({
      where: {
        refreshToken: cookies.refreshToken,
      },
    });
    if (!getUserByRefreshToken) {
      return res.status(204).send({
        response: "fail",
        message: `User by refresh token NOT FOUND`,
      });
    }
    // End Cek User By refreshToken

    // Update refreshToken in Database in TbUser
    const updateUser = await TbUser.update(
      {
        refreshToken: null,
      },
      {
        where: { id: getUserByRefreshToken.id },
      }
    );
    if (!updateUser) {
      return res.status(204).send({
        response: "fail",
        message: `Update User FAIL`,
      });
    }
    // End Update refreshToken in Database in TbUser

    res.clearCookie("refreshToken");
    return res.send({
      response: "success",
      message: `Logout SUCCESS`,
    });
  } catch (error) {
    return res.status(404).send({
      response: "fail",
      message: `Error ${error}`,
    });
  }
};
