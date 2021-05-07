/* eslint-disable max-len */
/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51IoaZfBSeOBf0BQKx06iiE2hRdGEhZQWhtX4aQ92B5Dpfz2hEfsPYFPzhSyEXiO8leGrVBZimiPF7aXaDACb8UrZ00xIybQCCU");

const app = express();

app.use(cors({
    origin: true,
}));


app.use(express.json());

app.post('/payments/create', async (req, res) => {
    try {
        const {amount, shipping} = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            shipping,
            amount,
            currency: 'usd',
        });

        res
            .status(200)
            .send(paymentIntent.client_secret);
    } catch (err) {
        res
            .status(500)
            .json({
                statusCode: 500,
                message: err.message,
            });
    }
});

app.get("*", (req, res) => {
    res
        .status(404)
        .send("404, Not Found.");
});

exports.api = functions.https.onRequest(app);
