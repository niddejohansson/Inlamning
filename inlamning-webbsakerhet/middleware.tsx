import { NextResponse, NextRequest } from "next/server";
import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";

type JWTmodel = {
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("token");
  let url = req.url;

  if (!verify && url !== "http://localhost:3000") {
    return NextResponse.next();
  }
  const decodedJWT = jwt_decode<JWTmodel | undefined>(verify ?? "");
  console.log(decodedJWT);

  if (!decodedJWT) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (decodedJWT?.role?.includes("worker") && !url.includes("/worker")) {
    return NextResponse.redirect("http://localhost:3000/worker");
  }

  if (decodedJWT?.role?.includes("boss") && !url.includes("/boss")) {
    return NextResponse.redirect("http://localhost:3000/boss");
  }

  if (decodedJWT?.role?.includes("admin") && !url.includes("/admin")) {
    return NextResponse.redirect("http://localhost:3000/admin");
  }

  if (!verify && url.includes("/boss")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (!verify && url.includes("/worker")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect("http://localhost:3000");
  }
}
