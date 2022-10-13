const app = require('express')();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 4000;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  insecureAuth: true,
});

app.get('/', async (req, res) =>{
    db.getConnection(async (err, connection) => {
        if (err) throw err;
        connection.query('SELECT username, userId FROM Users', (err, result, fields) => {
            if (err){
                throw err;
            } else {
                connection.release();
                res.send(result)
            }
        });
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})