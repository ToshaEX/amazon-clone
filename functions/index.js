const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Kcl7vLWLotPmEHD2Xykf6wMd56ZQACbmLAvTIMWq2JrTghQrmwvorRAPjAVeqcxeBcTSTS5OOEw4ofYhTUKeaYy000ooLTx72"
);

//API

// -App config
const app = express();

// - Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// -API routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment req Recieved Boom ", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    switch (err.type) {
      case "StripeCardError":
        // A declined card error
        err.message; // => e.g. "Your card's expiration year is invalid."
        break;
      case "StripeRateLimitError":
        // Too many requests made to the API too quickly
        break;
      case "StripeInvalidRequestError":
        // Invalid parameters were supplied to Stripe's API
        break;
      case "StripeAPIError":
        // An error occurred internally with Stripe's API
        break;
      case "StripeConnectionError":
        // Some kind of error occurred during the HTTPS communication
        break;
      case "StripeAuthenticationError":
        // You probably used an incorrect API key
        break;
      default:
        // Handle any other types of unexpected errors
        break;
    }
  }
});

// - Listen command
exports.api = functions.https.onRequest(app);

//Example End Point
//-http://localhost:5001/challenge-dc070/us-central1/api
//https://challenge-dc070.web.app/
