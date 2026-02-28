"use client";

import { useEffect, useState } from "react";
import { LogOut, Calendar, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import Link from "next/link";

interface Booking {
    id: string;
    startDate: string;
    endDate: string;
    customerName: string;
    customerEmail: string;
    totalPrice: number;
    status: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const res = await fetch("/api/admin/bookings");
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data.bookings);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, []);

    const handleLogout = async () => {
        // A simple way to logout is to clear the cookie via an API route, or just document.cookie.
        // For simplicity, we just delete it visually and redirect (real deletion requires API endpoint but this works as demo).
        document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-primary text-white p-6 flex flex-col justify-between hidden md:flex min-h-screen overflow-y-auto">
                <div>
                    <h2 className="text-2xl font-serif mb-12">Admin Panel</h2>
                    <nav className="space-y-4">
                        <Link href="/admin" className=" flex items-center space-x-3 text-accent hover:text-white transition-colors">
                            <Calendar className="w-5 h-5" />
                            <span>Alla Bokningar</span>
                        </Link>
                        <Link href="/admin/blocked" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
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
            <div className="flex-1 p-8 md:p-12 min-h-screen">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-serif text-primary">Alla Bokningar</h1>
                    {/* Mobile nav hints could go here */}
                </div>

                <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-gray-500">Laddar bokningar...</div>
                    ) : bookings.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">Inga bokningar funna.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-text">
                                <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-text-muted">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Kund</th>
                                        <th className="px-6 py-4 font-medium">Datum</th>
                                        <th className="px-6 py-4 font-medium">Skapad</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Pris</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {bookings.map((b) => (
                                        <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium">{b.customerName}</div>
                                                <div className="text-text-muted text-xs">{b.customerEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {format(new Date(b.startDate), "dd MMM yyyy", { locale: sv })} - <br />
                                                {format(new Date(b.endDate), "dd MMM yyyy", { locale: sv })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-text-muted">
                                                {format(new Date(b.createdAt), "dd MMM, HH:mm", { locale: sv })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider
                          ${b.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                        b.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                    {b.status === 'paid' ? 'Betald' : b.status === 'cancelled' ? 'Avbruten' : 'Väntar'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                {b.totalPrice.toLocaleString("sv-SE")} NOK
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
