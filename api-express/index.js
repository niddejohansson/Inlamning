const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
require("dotenv").config();

const jwtvalidator = require("./middleware/jwtvalidator");
const db = require("./database");
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.post("/api/login", async (req, res) => {
  const username = req.body.email;
  let password = req.body.password;

  if (!username || !password) {
    console.log("fyll i fälten");
    res.status(400);
    return;
  }
  const user = await db.getUsersByEmail(username);

  if (!user) {
    console.log("användare finns inte");
    res.status(400).json({ message: "användare finns inte" });
    return;
  }

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    console.log("fel lösenord");
    res.status(400).json({ message: "fel lösenord" });
    return;
  }
  const roleFromUserId = await db.getRolesForUser(user.userId);

  let roles = [];
  roleFromUserId.forEach((role) => {
    roles.push(role.rolename);
  });

  const accessToken = jwt.sign(
    {
      username: user.username,
      email: user.email,
      role: roles,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15min",
    }
  );
  res
    .status(200)
    .cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
    })
    .json({
      username: user.username,
      email: user.email,
      role: roles,
      accessToken: accessToken,
    });
});

app.get("/api/logout", async (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

app.get("/api/getcurrentuser", jwtvalidator, async (req, res) => {
  try {
    const user = { username: req.username, email: req.email, role: req.role };
    res.json(user);
  } catch (err) {
    console.log("error i getcurrentuser");
  }
});

app.post("/api/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const rolename = req.body.role;
  const password2 = req.body.password2;
  let password = req.body.password;

  try {
    if (!username || !password || !email) {
      console.log("fyll i fälten");
      return res.sendStatus(400);
    }

    if (password !== password2) {
      console.log("lösenorden är inte samma");
      return res.sendStatus(400);
    }

    const checkUser = await db.getUsersByEmail(email);
    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await db.createUser({
      username: username,
      hashedPassword: hashedPassword,
      email: email,
    });
    //get role id by rolename
    const role = await db.getRoleByRolename(rolename);
    //assign role to user
    await db.assignRoleToUser(role.roleId, userId);

    res.status(200).json({
      username: username,
      email: email,
      role: role.rolename,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

app.get("/api/getallusers", async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
});

app.get("/api/testauth", jwtvalidator, async (req, res) => {
  console.log("testauth");
  res.json({ message: "hejhej" });
});

app.get("/api/getallbosses", async (req, res) => {
  const bosses = await db.getAllBosses();
  res.json(bosses);
});

app.get("/api/getallworkers", async (req, res) => {
  const workers = await db.getAllWorkers();
  res.json(workers);
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
