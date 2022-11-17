const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;

const jwtValidator = (req, res, next) => {
  const { cookies } = req;
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const data = jwt.verify(token, secret);
    req.username = data.username;
    req.role = data.role;
    req.email = data.email;
    next();
  } catch (err) {
    console.log("err i jwtvalid", err);
    return res.status(401).json({ message: "no" });
  }
};

const adminValidator = (req, res, next) => {
  const { cookies } = req;
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const data = jwt.verify(token, secret);
    if (data.role === "admin") {
      req.username = data.username;
      req.role = data.role;
      req.email = data.email;
      return next();
    } else {
      return res.status(403).json({ message: "access forbidden" });
    }
  } catch (err) {
    console.log("err i jwtvalid", err);
    return res.status(401).json({ message: "not vaild jwt" });
  }
};

const bossValidator = (req, res, next) => {
  const { cookies } = req;
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const data = jwt.verify(token, secret);
    if (data.role === "boss") {
      req.username = data.username;
      req.role = data.role;
      req.email = data.email;
      return next();
    } else {
      return res.status(403).json({ message: "access forbidden" });
    }
  } catch (err) {
    console.log("err i jwtvalid", err);
    return res.status(401).json({ message: "not vaild jwt" });
  }
};

const workerValidator = (req, res, next) => {
  const { cookies } = req;
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const data = jwt.verify(token, secret);
    if (data.role === "worker") {
      req.username = data.username;
      req.role = data.role;
      req.email = data.email;
      return next();
    } else {
      return res.status(403).json({ message: "access forbidden" });
    }
  } catch (err) {
    console.log("err i jwtvalid", err);
    return res.status(401).json({ message: "not vaild jwt" });
  }
};

module.exports = {
  jwtValidator,
  adminValidator,
  bossValidator,
  workerValidator,
};
