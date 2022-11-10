import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "PUT") {
    const { id, qty } = JSON.parse(req.body);
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }
    const body = JSON.stringify({ id: id, quantity: qty });

    try {
      const apiRes = await fetch(`${API_URL}/cart/modify_cart_item/`, {
        method: "PUT",
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
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
