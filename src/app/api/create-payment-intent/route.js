import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/authOptions";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_key_for_build");
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

    // Use session data, never trust client body for sensitive info
    const parcelName = body.parcelName || "Mk-Global Express Delivery";
    const senderName = session.user.name || "Transify Customer";
    const userId = session.user.id;

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents
      currency: "ngn",
      metadata: { parcelName, senderName, userId },
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
