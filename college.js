require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();

const bcrypt = require("bcryptjs");

const my_connection = require("./connection");

const db = new my_connection();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/users", async (req, res) => {
  const data = req.body;

  const query = `insert into tbl_student(id,firstName,lastName,email,password,phoneNum)values(?,?,?,?,?,?);`;
  const creeptedPassword = await bcrypt.hash(data.password, 15);

  const saveData = [
    data.id,
    data.firstName,
    data.lastName,
    data.email,
    creeptedPassword,
    data.phoneNum,
  ];

  const DATA_INSERTED = await db.execute(query, saveData);

  res.json({ msg: "Data insertion is: ", DATA_INSERTED });
});

app.use((err, req, res, next) => {
  if (err.message === "access denied") {
    res.status(403);
    res.json({ error: err.message });
  }

  next(err);
});

app.listen(4000, async () => {
  await db.connect();
  console.log("Server is running on port 4000");
});
