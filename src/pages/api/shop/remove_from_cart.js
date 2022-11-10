import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body);
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }
    const body = JSON.stringify({ id: id });

    try {
      const apiRes = await fetch(`${API_URL}/cart/modify_cart_item/`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: body,
      });
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json({
          success: data.success,
        });
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when trying to remove item",
      });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
