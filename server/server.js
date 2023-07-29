const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const PORT = 4242;

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true })) // <-- enable CORS here and set credentials true in our headers

// TODO: install dotenv
// TODO: put secret API key into .env
// pass "secret" API key from stripe developer dashboard
const stripe = require("stripe")("sk_test_51NZ3VfDHtd9HD34XQdjZYNmn7zxO1YnCITFHtUSM5GiRlRdv6ivwOkki6ty6T65N9O0i7ziOnWDWpqt8v3Bo3JEh00r3I3Hxds");

// TODO: replace "success_url"/"cancel_url" && res.redirect("url") with variable from .env for dev and prod (replace hardcoded localhost)

// stripe Dashboard: [to demo processed payment](https://dashboard.stripe.com/test/dashboard)
// [checkout docs](https://stripe.com/docs/checkout/quickstart?lang=node) for Stripe (used and customized below)
// TO TEST PAYMENT THRU TO STRIPE, checkout with fake credit card --> 4242 4242 4242 4242 (from port #) to see processing in Stripe Dashboard
// using shipping API example [here](https://stripe.com/docs/payments/during-payment/charge-shipping?dashboard-or-api=api) (scroll down)
app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.product]
          },
          unit_amount: item.price * 100
        },
        quantity: item.quantity,
    })),
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html"
    }) // <-- stripe.checkout.sessions.create() ?
    res.status(200).json(session);
    // TODO: need to redirect from success.html back to homepage, below doesn't work
    // setTimeout(() => res.redirect("http://localhost:4200/home"), 4000);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => console.log(`app is running on ${PORT}`));
