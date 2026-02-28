// @ts-nocheck
export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const startParam = searchParams.get("start");
    const endParam = searchParams.get("end");

    if (!startParam || !endParam) {
        return NextResponse.json(
            { error: "Start and end dates are required" },
            { status: 400 }
        );
    }

    const startDate = new Date(startParam);
    const endDate = new Date(endParam);

    try {
        // Check blocked dates
        const blockedDates = await prisma.blockedDate.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        if (blockedDates.length > 0) {
            const reason = blockedDates[0].reason || "Några datum är spärrade av administratören";
            return NextResponse.json({ available: false, reason });
        }

        // Check existing confirmed bookings
        const overlappingBookings = await prisma.booking.findMany({
            where: {
                status: { in: ["paid", "pending"] },
                AND: [
                    { startDate: { lte: endDate } },
                    { endDate: { gte: startDate } },
                ],
            },
        });

        if (overlappingBookings.length > 0) {
            return NextResponse.json({ available: false, reason: "Dates are already booked" });
        }

        return NextResponse.json({ available: true });
    } catch (error) {
        console.error("Availability check error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
