const { TbUser } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const joi = require("joi");
const bcrypt = require("bcrypt");

exports.testRun = (req, res) => {
  return res.json({
    response: "success",
    message: "Response SUCCESS",
  });
};

exports.getDatas = async (req, res) => {
  try {
    //Get Data
    const getDatas = await TbUser.findAll({
      attributes: {
        exclude: ["refreshToken", "createdAt", "updatedAt"],
      },
    });
    if (!getDatas) {
      return res.status(400).json({
        rresponse: "success",
        message: "Response SUCCESS",
      });
    }
    // End Get Data

    return res.json({
      rresponse: "success",
      message: "Response SUCCESS",
      data: getDatas,
    });
  } catch (error) {
    return res.status(4004).json({
      rresponse: "fail",
      message: error,
    });
  }
};

exports.getDataById = async (req, res) => {
  try {
    const { params } = req;

    if (params.id === null || !params.id) {
      return res.status(400).json({
        response: "fail",
        message: `ID must be required`,
      });
    }

    // Get data With ID
    const getData = await TbUser.findOne({
      where: {
        id: params.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!getData) {
      return res.status(400).json({
        response: "fail",
        message: `Data with ID: ${params.id} NOT FOUND`,
      });
    }
    // Get data With ID

    return res.send({
      response: "success",
      message: "This is Test API Product",
      data: getData,
    });
  } catch (error) {
    return res.status(400).send({
      response: "fail",
      message: error,
    });
  }
};

exports.addData = async (req, res) => {
  try {
    const { body } = req;

    // Validation Data
    const validator = joi.object({
      email: joi.string().email().min(4).required(),
      username: joi.string().min(4).required(),
      password: joi.string().min(4).required(),
      fullname: joi.string().min(4).required(),
    });
    const { error } = validator.validate(body);
    if (error) {
      return res.status(400).json({
        response: "fail",
        message: error.details[0].message,
      });
    }
    // End Validation Data

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
    // End Check Email already exist

    // Hashing Password
    const hashPassword = await bcrypt.hash(body.password, 10);

    // Insert to database
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
    // End Insert to database

    return res.json({
      response: "success",
      message: "Add Data SUCCESS",
      dataInput: body,
    });
  } catch (error) {
    return res.status(4004).json({
      response: "fail",
      message: error,
    });
  }
};
