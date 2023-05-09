const { TbProduct } = require("../../models");
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

exports.getDatas = async (req, res) => {
  try {
    const dataProsucts = await TbProduct.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return res.json({
      response: "success",
      message: "Get Data SUCCESS",
      data: dataProsucts,
    });
  } catch (error) {
    return res.json({
      response: "fail",
      message: error,
    });
  }
};
