import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_key_for_build");
  try {
    const body = await req.json();

    // Ensure amount exists and convert to integer cents
    let amount = body.amount;
    if (!amount || isNaN(amount)) {
      return NextResponse.json(
        { error: "Invalid or missing amount" },
        { status: 400 }
      );
    }

    amount = Math.round(Number(amount)); // make sure integer

    // Optional: add default metadata if missing
    const parcelName = body.parcelName || "Unknown Parcel";
    const senderName = body.senderName || "Unknown Sender";

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents
      currency: "ngn",
      metadata: { parcelName, senderName },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: err.message || "Stripe payment failed" },
      { status: 500 }
    );
  }
}
