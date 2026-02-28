// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { Booking } from "@prisma/client";

// Basic auth check for API routes
async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const bookings = await prisma.booking.findMany({
            orderBy: { createdAt: "desc" },
        });

        // Convert dates to ISO strings for JSON serialization
        const serializedBookings = bookings.map((b: Booking) => ({
            ...b,
            startDate: b.startDate.toISOString(),
            endDate: b.endDate.toISOString(),
            createdAt: b.createdAt.toISOString(),
            updatedAt: b.updatedAt.toISOString(),
        }));

        return NextResponse.json({ bookings: serializedBookings });
    } catch (error) {
        console.error("Failed to fetch bookings:", error);
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}
