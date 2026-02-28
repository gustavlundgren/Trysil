"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Stugan", href: "/cabin" },
        { name: "Trysil", href: "/trysil" },
        { name: "Boka", href: "/booking" },
        { name: "Kontakt", href: "/contact" },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-serif text-primary hover:opacity-80 transition-opacity">
                            Trysil<span className="text-accent font-sans text-xl ml-1">Cabin</span>
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm uppercase tracking-widest text-text-muted hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/booking"
                            className="bg-primary text-white px-6 py-2.5 rounded-sm text-sm uppercase tracking-widest hover:bg-secondary transition-all"
                        >
                            Boka Nu
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-text hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 animate-slide-up origin-top absolute w-full">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-4 text-base uppercase tracking-widest text-text hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
