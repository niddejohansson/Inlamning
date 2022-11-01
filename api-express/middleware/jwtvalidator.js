//middleware
const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;

const jwtValidator = (req, res, next) => {
  const { cookies } = req;
  const token = cookies.token;
  const url = req.url;

  if (!token) {
    console.log("hamnar jag här?");

    return res.status(400);
  }

  const data = jwt.verify(token, secret);
  req.username = data.username;
  req.role = data.role[0];
  req.email = data.email;

  console.log("jwt validator", data);
  next();
};

module.exports = jwtValidator;
