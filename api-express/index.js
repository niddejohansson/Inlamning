const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const pool = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  insecureAuth: true,
});

// db.createUser = (username, email, password) => {
//     return new Promise((resolve, reject) => {
//         `INSERT INTO Users (username, email, password) VALUES (?)`;
//     })
// }

// app.get('/', async (req, res) =>{
//     db.getConnection(async (err, connection) => {
//         if (err) throw err;
//         connection.query('SELECT username, userId FROM Users', (err, result, fields) => {
//             if (err){
//                 throw err;
//             } else {
//                 connection.release();
//                 res.send(result)
//             }
//         });
//     });
// });

app.post("/api/login", async (req, res) => {
  const username = req.body.email;
  let password = req.body.password;
  console.log(username, password);
  try {
    if (!username || !password) {
      console.log("fyll i fälten");
      return res.sendStatus(400);
    }
    console.log("rad 59");
    const user = await new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Users WHERE email = ?";
      const query = mysql.format(sql, [username]);
      pool.query(query, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result[0]);
      });
    });
    //kolla lösenordet här
    res.send(user);
    console.log("rad 69", user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const role = req.body.role;
  let password = req.body.password;
  console.log(username, password);

  // 1. Check for empty data
  try {
    if (!username || !password || !email) {
      console.log("fyll i fälten");
      return res.sendStatus(400);
    }

    // 2. Check if user already exists in DB

    const user = await new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Users WHERE email = ?";
      const query = mysql.format(sql, [email]);
      pool.query(query, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result[0]);
      });
    });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3. Hash password & Register USER

    const hashedPassword = await bcrypt.hash(password, 10);
    //const userId = await db.createUser(username, email, hashedPassword);
    console.log(hashedPassword);

    const sql =
      "INSERT INTO Users (userId, username, password, email, role) VALUES (?, ?, ?, ?, ?)";
    const query = mysql.format(sql, [
      null,
      username,
      hashedPassword,
      email,
      role,
    ]);
    pool.query(query, (err, result) => {
      if (err) {
        return res.sendStatus(400);
      }
      console.log("detta är result", result);
      return res.sendStatus(200);
    });
  } catch (err) {
    console.log("error?", err);
    return res.sendStatus(400);
  }

  // 4. Assign ROLE to USER

  // 5. Get ROLES for USER

  // 6. Set accessToken cookie and return data
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
