// @ts-nocheck
export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
    apiVersion: "2024-12-18.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
    try {
        const body = await request.text();
        const signature = (await headers()).get("Stripe-Signature") as string;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err: any) {
            console.error(`Webhook signature verification failed.`, err.message);
            return NextResponse.json({ error: err.message }, { status: 400 });
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const bookingId = session.metadata?.bookingId;

            if (bookingId) {
                await prisma.booking.update({
                    where: { id: bookingId },
                    data: { status: "paid" },
                });
                console.log(`Payment successful for booking ${bookingId}`);
            }
        } else if (event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const bookingId = session.metadata?.bookingId;

            if (bookingId) {
                await prisma.booking.update({
                    where: { id: bookingId },
                    data: { status: "cancelled" },
                });
                console.log(`Payment failed/expired for booking ${bookingId}`);
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Stripe webhook error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        );
    }
}
