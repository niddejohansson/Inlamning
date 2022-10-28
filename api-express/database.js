const mysql = require("mysql");
require("dotenv").config();

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

let db = {};

db.getUsersByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Users WHERE email = ?";
    const query = mysql.format(sql, [email]);
    pool.query(query, (err, result) => {
      if (err) {
        console.log("inne i error");
        return reject(err);
      }
      return resolve(result[0]);
    });
  });
};

db.createUser = (user) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Users (userId, username, password, email, role) VALUES (?, ?, ?, ?, ?)";

    const query = mysql.format(sql, [
      null,
      user.username,
      user.hashedPassword,
      user.email,
      user.role,
    ]);
    pool.query(query, (err, result) => {
      if (err) {
        console.log("här crashar det", err);
        reject(err);
      }
      console.log(result);
      resolve(result.insertId);
    });
  });
};

db.getRolesForUser = (userId) => {
  console.log("getRolesForUser userid", userId);
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT Roles.roleId, Roles.rolename FROM UsersWithRoles INNER JOIN Roles ON Roles.roleId = UsersWithRoles.roleId WHERE UsersWithRoles.userId = ?";
    const query = mysql.format(sql, [userId]);

    pool.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      console.log("logg i databas getrolesforuser", result);
      return resolve(result);
    });
  });
};

db.getRoleByRolename = (rolename) => {
  return new Promise((resolve, reject) => {
    const sql = "select * from Roles where Roles.rolename = ?";
    const query = mysql.format(sql, [rolename]);
    pool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

db.assignRoleToUser = (roleId, userId) => {
  console.log(roleId);
  return new Promise((resolve, reject) => {
    const sql = "INSERT into UsersWithRoles (userId, roleId) VALUES (?, ?)";
    const query = mysql.format(sql, [userId, roleId]);
    pool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

db.getUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Users";
    pool.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

db.getUser = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Users WHERE role = 'boss';";
    pool.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

db.getAllBosses = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Users WHERE role = 'boss';";
    pool.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

db.getAllWorkers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Users WHERE role = 'worker';";
    pool.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = db;
