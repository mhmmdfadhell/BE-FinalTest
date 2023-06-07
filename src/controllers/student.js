const { student } = require("../../models");
const { user } = require("../../models");
const joi = require("joi");
const moment = require("moment");

const getPagination = (page, size) => {
  const limit = size ? +size : 4;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

exports.getAllStudent = async (req, res) => {
  try {
    const { page, size, fullnameSort } = req.query;
    const { limit, offset } = getPagination(page, size);

    const userData = await user.findOne({
      where: {
        id: req.user.id,
      },
      attrributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const data = await student.findAndCountAll({
      order: [["fullname", fullnameSort == 0 ? "ASC" : "DESC"]],
      limit,
      offset,
      attrributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const { count: totalItems, rows: students } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return res.render("pages/dashboard", {
      users: userData,
      moment: moment,
      students: students,
      currentPage: currentPage,
      totalPages: totalPages,
      totalItems: totalItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.insertStudent = async (req, res) => {
  try {
    const body = req.body;
    let age = moment().diff(moment(body.born_date, "YYYY-MM-DD"), "years");

    const data = {
      fullname: body.fullname,
      age: age,
      born_date: body.born_date,
      grade: body.grade,
      address: body.address,
      hp: body.hp,
      parent_name: body.parent_name,
      parent_hp: body.parent_hp,
    };

    const schema = joi.object({
      fullname: body.fullname,
      born_date: body.born_date,
      grade: body.grade,
      address: body.address,
      hp: body.hp,
      parent_name: body.parent_name,
      parent_hp: body.parent_hp,
    });

    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }

    await student.create(data);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.editStudent = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    // let age = moment().diff(moment(body.born_date, "YYYY-MM-DD"), "years");

    const findStudent = await student.findOne({
      where: {
        id: id,
      },
      attrributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.render("pages/edit", {
      data: findStudent,
      moment:moment
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    await student.destroy({
      where: {
        id: id,
      },
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error!",
    });
  }
};
