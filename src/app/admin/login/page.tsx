"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin");
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center -mt-20">
            <div className="bg-white p-10 shadow-2xl rounded-sm w-full max-w-md border border-gray-100">
                <h1 className="text-3xl font-serif text-primary text-center mb-8">Admin Login</h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-text mb-2">Lösenord</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-accent focus:border-accent outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">Felaktigt lösenord.</p>}

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-4 rounded-sm hover:-translate-y-1 hover:shadow-lg transition-all uppercase tracking-widest text-sm"
                    >
                        Logga In
                    </button>
                </form>
            </div>
        </div>
    );
}
