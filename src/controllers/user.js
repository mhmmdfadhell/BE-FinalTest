const { user } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");

exports.Register = async (req, res) => {
  try {
    const body = req.body;

    const schema = joi.object({
      username: joi.string().min(3).required(),
      role: joi.string().min(3).required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await user.create({
      username: body.username,
      role: body.role,
      email: body.email,
      password: hashedPassword,
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const body = req.body;

    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }

    let findUser = await user.findOne({
      where: {
        email: body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!findUser) {
      return res.status(400).send({
        message: "Email or password doesn't match!",
      });
    }

    const matchPassword = bcrypt.compare(body.password, findUser.password);

    if (!matchPassword) {
      return res.status(400).send({
        message: "Email or password doesn't match!",
      });
    }

    const accessToken = jwt.sign(
      { id: findUser.id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.cookie("token", accessToken);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error!",
    });
  }
};
