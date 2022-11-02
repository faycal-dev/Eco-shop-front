import cookie from "cookie";
import { API_URL } from '../../../config/index';


export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access === false) {
      return res.status(401).json({
        error: "User Already logged out",
      });
    }

    const body = JSON.stringify({ refresh_token: cookies.refresh });

    try {
      const apiRes = await fetch(`${API_URL}/account/logout/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: body,
      });

      if (apiRes.status === 200) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            expires: new Date(0),
            sameSite: "strict",
            path: "/",
          }),
          cookie.serialize("refresh", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            expires: new Date(0),
            sameSite: "strict",
            path: "/",
          }),
        ]);

        return res.status(200).json({
          success: "Token blacklisted successfully",
        });
      } else {
        return res.status(apiRes.status).json({
          error: "logging out failed",
        });
      }
    } catch (err) {
        console.log(err)
      return res.status(500).json({
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} now allowed`,
    });
  }
};
