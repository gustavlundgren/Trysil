"use client";

import { useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
import { sv } from "date-fns/locale";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Calendar, PlusCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlockedDatesPage() {
    const [range, setRange] = useState<DateRange | undefined>();
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "error" | "success", text: string } | null>(null);

    const router = useRouter();

    const handleLogout = () => {
        document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    };

    const handleBlockDates = async () => {
        if (!range?.from || !range?.to) {
            setMessage({ type: "error", text: "Välj start- och slutdatum att blockera." });
            return;
        }

        setLoading(true);
        try {
            // Get all dates in interval
            const datesToBlock = eachDayOfInterval({ start: range.from, end: range.to });

            const res = await fetch("/api/admin/blocked", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    dates: datesToBlock.map(d => d.toISOString()),
                    reason: reason || "Manuellt blockerad av administratör"
                }),
            });

            if (!res.ok) throw new Error("Gick inte att blockera datum.");

            setMessage({ type: "success", text: "Datumen har blockerats! De är nu stängda för bokning." });
            setRange(undefined);
            setReason("");
        } catch (err: any) {
            setMessage({ type: "error", text: "Ett fel uppstod när datumen skulle blockeras." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-primary text-white p-6 flex flex-col justify-between hidden md:flex min-h-screen">
                <div>
                    <h2 className="text-2xl font-serif mb-12">Admin Panel</h2>
                    <nav className="space-y-4">
                        <Link href="/admin" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                            <Calendar className="w-5 h-5" />
                            <span>Alla Bokningar</span>
                        </Link>
                        <Link href="/admin/blocked" className="flex items-center space-x-3 text-accent hover:text-white transition-colors">
                            <PlusCircle className="w-5 h-5" />
                            <span>Blockera Datum</span>
                        </Link>
                    </nav>
                </div>
                <button onClick={handleLogout} className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Logga ut</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 md:p-12">
                <h1 className="text-3xl font-serif text-primary mb-10">Blockera Datum</h1>

                <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-8 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        <div className="flex flex-col items-center">
                            <h2 className="text-lg font-medium text-text mb-4">Välj period</h2>
                            <DayPicker
                                mode="range"
                                selected={range}
                                onSelect={setRange}
                                disabled={{ before: new Date() }}
                                locale={sv}
                                className="bg-gray-50 p-4 rounded-sm border border-gray-100 shadow-sm"
                                modifiersStyles={{
                                    selected: { backgroundColor: '#B08B5E' },
                                }}
                            />
                        </div>

                        <div className="flex flex-col space-y-6 justify-center">
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">Anledning (Frivilligt)</label>
                                <input
                                    type="text"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-accent focus:border-accent outline-none"
                                    placeholder="T.ex. underhåll eller egen vistelse"
                                />
                            </div>

                            {message && (
                                <div className={`p-4 rounded-sm text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border p-2 border-green-200' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                                    {message.text}
                                </div>
                            )}

                            <button
                                onClick={handleBlockDates}
                                disabled={loading || !range}
                                className="w-full bg-accent hover:bg-[#a88258] text-white py-4 flex items-center justify-center space-x-2 rounded-sm shadow-md transition-all uppercase tracking-widest text-sm disabled:opacity-50"
                            >
                                {loading ? (
                                    <span>Sparar...</span>
                                ) : (
                                    <>
                                        <PlusCircle className="w-5 h-5" />
                                        <span>Blockera Period</span>
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
