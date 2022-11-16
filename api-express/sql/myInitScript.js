const mysql = require("mysql");

const bcrypt = require("bcrypt");

const adminPwd = bcrypt.hashSync("admin", 10);
const bossPwd = bcrypt.hashSync("bossboss", 10);
const workerPwd = bcrypt.hashSync("worker", 10);

require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  multipleStatements: true,
});

db.connect(async (err, connection) => {
  console.log("RUNNING CREATE INIT USERS SCRIPT");
  let createInitAdmin = `INSERT INTO Users (userId, username, password, email) VALUES (null, "admin", "${adminPwd}", "admin@admin.se");`;
  let createInitBoss = `INSERT INTO Users (userId, username, password, email) VALUES (null, "boss", "${bossPwd}", "boss@boss.se");`;
  let createInitWorker = `INSERT INTO Users (userId, username, password, email) VALUES (null, "worker", "${workerPwd}", "worker@worker.se");`;
  let createAdminRole = `INSERT into Roles (roleId, rolename) VALUES (1337, "admin");`;
  let createBossRole = `INSERT into Roles (roleId, rolename) VALUES (2000, "boss");`;
  let createWorkerRole = `INSERT into Roles (roleId, rolename) VALUES (3000, "worker");`;
  let assignAdminRole = `INSERT into UsersWithRoles (userId, roleId) VALUES (1, 1337);`;
  let assignBossRole = `INSERT into UsersWithRoles (userId, roleId) VALUES (2, 2000);`;
  let assignWorkerRole = `INSERT into UsersWithRoles (userId, roleId) VALUES (3, 3000);`;

  let query =
    createInitAdmin +
    createInitBoss +
    createInitWorker +
    createAdminRole +
    createBossRole +
    createWorkerRole +
    assignAdminRole +
    assignBossRole +
    assignWorkerRole;

  db.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("USERS CREATED");
    process.exit(0);
  });
});
