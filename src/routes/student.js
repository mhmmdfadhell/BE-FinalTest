const express = require("express");
const router = express.Router();
const student = require("../controllers/student");
const { authToken } = require("../middleware/authToken");

router.get("/dashboard", authToken, student.getAllStudent);
router.post("/add-student", authToken, student.insertStudent);
router.post("/update-student/:id", authToken, student.updateStudent);
router.get("/edit-student/:id", authToken, student.editStudent);
router.get("/delete-student/:id", authToken, student.deleteStudent);

module.exports = router;
