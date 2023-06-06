const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoutes = require("./src/routes/user");
const studentRoutes = require("./src/routes/student");
require("dotenv").config();
const app = express();
const port = 3003;


app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", studentRoutes);
app.use("/", userRoutes);



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.get("/", (req, res) => {
  res.render("pages/");
});




app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

module.exports = app;
