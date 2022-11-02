//middleware
const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;

const jwtValidator = (req, res, next) => {
  const { cookies } = req;
  const token = cookies.token;
  const url = req.url;
  try {
    if (!token) {
      return res.status(400);
    }

    if (token) {
      const data = jwt.verify(token, secret);
      req.username = data.username;
      req.role = data.role[0];
      req.email = data.email;

      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = jwtValidator;
