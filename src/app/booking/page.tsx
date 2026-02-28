"use client";

import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { sv } from "date-fns/locale";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function BookingPage() {
    const [range, setRange] = useState<DateRange | undefined>();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "error" | "success" | "info", text: string } | null>(null);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

    // Form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const PRICE_PER_NIGHT = 2500;

    const calculatePrice = () => {
        if (!range?.from || !range?.to) return 0;
        const nights = differenceInDays(range.to, range.from);
        return nights > 0 ? nights * PRICE_PER_NIGHT : 0;
    };

    const handleCheckAvailability = async () => {
        if (!range?.from || !range?.to) {
            setMessage({ type: "error", text: "Vänligen välj ett start- och slutdatum." });
            return;
        }

        if (range.from.getTime() === range.to.getTime()) {
            setMessage({ type: "error", text: "Vistelsen måste vara minst en natt." });
            return;
        }

        setLoading(true);
        setMessage(null);
        setCheckoutUrl(null);

        try {
            const res = await fetch(`/api/availability?start=${range.from.toISOString()}&end=${range.to.toISOString()}`);
            if (!res.ok) throw new Error("Kunde inte hämta tillgänglighet");

            const data = await res.json();

            if (data.available) {
                setMessage({ type: "success", text: `Datumen är tillgängliga! Totalt pris: ${calculatePrice().toLocaleString("sv-SE")} NOK.` });
            } else {
                setMessage({ type: "error", text: `Datumen är tyvärr inte tillgängliga: ${data.reason}` });
            }
        } catch (err: any) {
            setMessage({ type: "error", text: "Ett fel uppstod vid kontrollen. Försök igen." });
        } finally {
            setLoading(false);
        }
    };

    const handleCheckout = async () => {
        if (!range?.from || !range?.to || !name || !email) {
            setMessage({ type: "error", text: "Vänligen fyll i namn och e-post innan betalning." });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    startDate: range.from.toISOString(),
                    endDate: range.to.toISOString(),
                    customerName: name,
                    customerEmail: email,
                }),
            });

            if (!res.ok) throw new Error("Checkout misslyckades");

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            setMessage({ type: "error", text: "Ett fel uppstod vid skapandet av betalningen." });
            setLoading(false);
        }
    };

    return (
        <div className="bg-background min-h-screen pt-12 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Boka Vistelse</h1>
                    <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                        Välj de datum du önskar besöka oss. Priset är {PRICE_PER_NIGHT} NOK per natt.
                        Betalning sker säkert via Stripe.
                    </p>
                </div>

                <div className="bg-white p-8 border border-gray-100 shadow-xl rounded-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Calendar */}
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-serif text-primary mb-6">Välj Datum</h2>
                            <DayPicker
                                mode="range"
                                selected={range}
                                onSelect={setRange}
                                disabled={{ before: new Date() }}
                                locale={sv}
                                className="bg-background p-4 rounded-sm border border-gray-100 shadow-sm"
                                modifiersStyles={{
                                    selected: { backgroundColor: '#1F362A' } // Tailwind primary color
                                }}
                            />
                        </div>

                        {/* Form & Actions */}
                        <div className="flex flex-col justify-center space-y-6">

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">Namn</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-accent focus:border-accent outline-none"
                                        placeholder="Fullständigt namn"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">E-post</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-accent focus:border-accent outline-none"
                                        placeholder="E-postadress"
                                    />
                                </div>
                            </div>

                            {message && (
                                <div className={`p-4 rounded-sm border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="pt-4 flex flex-col space-y-3">
                                <button
                                    onClick={handleCheckAvailability}
                                    disabled={loading}
                                    className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-4 rounded-sm transition-colors uppercase tracking-widest text-sm disabled:opacity-50"
                                >
                                    {loading ? "Laddar..." : "1. Kontrollera Tillgänglighet"}
                                </button>

                                {message?.type === "success" && (
                                    <button
                                        onClick={handleCheckout}
                                        disabled={loading || !name || !email}
                                        className="w-full bg-accent hover:bg-[#a88258] text-white py-4 rounded-sm shadow-lg transition-transform hover:-translate-y-1 uppercase tracking-widest text-sm disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                                    >
                                        {loading ? "Skapar Betalning..." : "2. Gå till Betalning (Stripe)"}
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
