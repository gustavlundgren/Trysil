import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Wifi, Car, Flame, Coffee } from "lucide-react";

export default function CabinPage() {
    const facilities = [
        { name: "3 Sovrum (8 bäddar)", icon: <BedDouble className="w-5 h-5" /> },
        { name: "1 Badrum & Bastu", icon: <Bath className="w-5 h-5" /> },
        { name: "WiFi", icon: <Wifi className="w-5 h-5" /> },
        { name: "Fri Parkering", icon: <Car className="w-5 h-5" /> },
        { name: "Braskamin", icon: <Flame className="w-5 h-5" /> },
        { name: "Fullt utrustat Kök", icon: <Coffee className="w-5 h-5" /> },
    ];

    return (
        <div className="bg-background min-h-screen pt-12">

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Om Stugan</h1>
                <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                <p className="max-w-3xl mx-auto text-text-muted text-lg leading-relaxed">
                    Välkommen till vår mysiga fjällstuga belägen på Fageråsen vid Högfjällscentret i hjärtat av Trysil. Här förenas skandinavisk
                    design med oslagbar närhet till backarna för att ge dig och ditt sällskap den ultimata vinterupplevelsen.
                </p>
            </div>

            {/* Main Content & Gallery */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Main Image */}
                    <div className="relative h-[500px] w-full rounded-sm overflow-hidden shadow-2xl group">
                        <Image
                            src="/interior1.png"
                            alt="Vinterstuga Inomhus"
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <h2 className="text-3xl font-serif text-primary mb-6">En hemtrevlig vistelse</h2>
                        <p className="text-text-muted mb-8 leading-relaxed">
                            Stugan är inredd för att skapa en äkta fjällkänsla. Stora fönster släpper in
                            det magiska vinterljuset och bjuder på utsikt över snöklädda granar. Värm dig framför braskaminen
                            efter en lång dag i skidbacken, eller njut av en avkopplande stund i bastun. Med bara 100 meter till barnbacken (ski in/ski out), är det enkelt för hela familjen att ta sig ut i systemet.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            {facilities.map((fac) => (
                                <div key={fac.name} className="flex items-center space-x-3 text-text">
                                    <div className="text-accent">{fac.icon}</div>
                                    <span className="font-medium">{fac.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
                            <h3 className="text-xl font-serif text-primary mb-4">Fakta</h3>
                            <ul className="space-y-3 text-sm text-text-muted">
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Yta</span> <span>125 kvm</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Avstånd till lift</span> <span>100 meter (Barnbacken, Ski in/out)</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Område</span> <span>Fageråsen / Högfjällscentret</span>
                                </li>
                                <li className="flex justify-between pb-2">
                                    <span>Husdjur</span> <span>Ej tillåtet</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-10">
                            <Link
                                href="/booking"
                                className="inline-block bg-primary hover:bg-secondary text-white px-8 py-4 rounded-sm text-sm uppercase tracking-widest transition-colors shadow-lg"
                            >
                                Se Tillgänglighet
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
