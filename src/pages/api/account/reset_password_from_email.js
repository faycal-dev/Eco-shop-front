import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "PATCH") {
    const { password, token, uidb64 } = req.body;

    const body = JSON.stringify({
      password,
      token,
      uidb64,
    });

    try {
      const apiRes = await fetch(
        `${API_URL}/account/password-reset-complete/`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

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
        error: "Something went wrong",
      });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
};
