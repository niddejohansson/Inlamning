//middleware

const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;

const jwtValidator = (req, res, next) => {
  console.log("inne i jwtvalid.js");
  const { cookies } = req;
  const token = cookies.token;
  const url = req.url;

  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }

  if (token) {
    const data = jwt.verify(token, secret);
    req.username = data.username;
    req.role = data.role[0];
    req.email = data.email;

    console.log("role  :", req.role);
    console.log("url  :", req.url);

    if (url.includes("/admin")) {
      console.log("är vi i includes /admin");
      if (jwt === undefined) {
        return redirect("/");
      }
      if (req.role !== "admin") {
        console.log("i !admin");
        redirect("/");
        return;
      }
      try {
        verify(jwt, secret);
        next();
      } catch (err) {
        return redirect("/");
      }
    }

    next();
  }
};

module.exports = jwtValidator;
