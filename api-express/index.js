const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());

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

const db = {}

db.createUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        `INSERT INTO Users (username, email, password) VALUES (?)`;
    })
}

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

app.post('/api/register', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;
    console.log(username, email, password);

    // 1. Check for empty data


    if(username && email && password) {
        createUser(username, email, password)
    }

    return res.sendStatus(200);


    // 2. Check if user already exists in DB



    // 3. Hash password & Register USER

    // 4. Assign ROLE to USER

    // 5. Get ROLES for USER
    
    // 6. Set accessToken cookie and return data
})

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})