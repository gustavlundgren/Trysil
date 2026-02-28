import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

                    {/* Brand & Description */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif">Trysil<span className="text-accent font-sans text-lg ml-1">Cabin</span></h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            En exklusiv vinterstuga i hjärtat av de norska fjällen. Perfekt för naturälskare och skidfantaster som söker en premiumupplevelse.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif">Länkar</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Hem</Link></li>
                            <li><Link href="/cabin" className="text-gray-400 hover:text-white transition-colors text-sm">Om Stugan</Link></li>
                            <li><Link href="/trysil" className="text-gray-400 hover:text-white transition-colors text-sm">Om Trysil</Link></li>
                            <li><Link href="/booking" className="text-gray-400 hover:text-white transition-colors text-sm">Boka</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif">Kontakt</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center justify-center md:justify-start space-x-3 text-gray-400 text-sm">
                                <MapPin className="h-4 w-4 text-accent" />
                                <span>Trysilfjället, Norge</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start space-x-3 text-gray-400 text-sm">
                                <Phone className="h-4 w-4 text-accent" />
                                <span>+46 70 123 45 67</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start space-x-3 text-gray-400 text-sm">
                                <Mail className="h-4 w-4 text-accent" />
                                <span>hej@trysilcabin.se</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} Trysil Cabin. Alla rättigheter förbehållna.</p>
                </div>
            </div>
        </footer>
    );
}
