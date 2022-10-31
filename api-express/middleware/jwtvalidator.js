//middleware
/* import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = process.env.ACCESS_TOKEN_SECRET;

const jwtValidator = (req, res, next) => {
  const { cookies } = req;
  const jwt = cookies.token;
  const url = req.url;

  if (url.includes("/admin")) {
    if (jwt === undefined) {
      return NextResponse.redirect("/");
    }
  }

  console.log("jwt validator");
  return next();
};

module.exports = jwtValidator;
 */
