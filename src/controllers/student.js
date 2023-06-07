const { student } = require("../../models");
const { user } = require("../../models");
const joi = require("joi");
const moment = require("moment");

exports.getAllStudent = async (req, res) => {
  try {


    const userData = await user.findOne({
      where: {
        id: req.user.id,
      },
      attrributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const data = await student.findAll({
      attrributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });


    return res.render("pages/dashboard", {
      users: userData,
      moment: moment,
      students: data,
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

exports.updateStudent = async (req,res) => {
  try {
    const body = req.body;
    const id = req.params.id;
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

    const findStudent = await student.findOne({
      where: {
        id: id,
      },
      attrributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    await findStudent.update(data, {
      where:{
        id
      }
    })
    res.redirect("/dashboard")
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error!",
    });
  } 
}

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
