import { NextResponse } from "next/server";
import jwt_decode from "jwt-decode";

export default async function middleware(req) {
  // const cookies = req.cookies.cookies
  // console.log(cookies);
  // const access = cookies.refresh ?? false;
  // const url = req.url;
  // let isAuth = false;
  // if (access) {
  //   let decoded_token = jwt_decode(access);
  //   console.log(decoded_token);
  // }

  // if (!isAuth && url.includes("/dashboard")) {
  //   return NextResponse.redirect("http://localhost:3001/login");
  // }
}
