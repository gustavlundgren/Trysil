// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
    apiVersion: "2024-12-18.acacia", // Adjusting API version. If this fails, we can just omit it or use any.
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { startDate, endDate, customerEmail, customerName } = body;

        if (!startDate || !endDate || !customerEmail || !customerName) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const PRICE_PER_NIGHT = 2500;
        const totalPrice = nights * PRICE_PER_NIGHT;

        const booking = await prisma.booking.create({
            data: {
                startDate: start,
                endDate: end,
                totalPrice,
                customerEmail,
                customerName,
                status: "pending",
            },
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "nok",
                        product_data: {
                            name: `Stay at Trysil Cabin (${nights} nights)`,
                            description: `From ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`,
                        },
                        unit_amount: totalPrice * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/booking`,
            customer_email: customerEmail,
            metadata: {
                bookingId: booking.id,
            },
        });

        await prisma.booking.update({
            where: { id: booking.id },
            data: { stripeSessionId: session.id },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
