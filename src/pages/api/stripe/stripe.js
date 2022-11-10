import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1M0nmQB88oo1CC5YGOi2CKiY" },
          { shipping_rate: "shr_1M0nnnB88oo1CC5Y4IPBkvfP" },
        ],
        line_items: req.body.map((item) => {
          const image = item.product.product_image[0].image;

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.product.title,
                images: [image],
              },
              unit_amount: parseFloat(item.price) * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/cart/success`,
        cancel_url: `${req.headers.origin}/cart`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
