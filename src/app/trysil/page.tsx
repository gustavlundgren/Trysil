import { Compass, Utensils, Waves, Snowflake } from "lucide-react";
import Image from "next/image";

export default function TrysilPage() {
    const activities = [
        {
            title: "Alpin Skidåkning",
            desc: "Norges största skidort erbjuder 68 backar och 32 liftar. Perfekt för både nybörjare och experter.",
            icon: <Snowflake className="w-6 h-6 text-accent" />
        },
        {
            title: "Längdskidåkning",
            desc: "Över 100 km välpreparerade spår finns tillgängliga direkt vid fjället.",
            icon: <Compass className="w-6 h-6 text-accent" />
        },
        {
            title: "Bad & Spa",
            desc: "Koppla av efter skidåkningen på Radisson Blu Resort's äventyrsbad eller spa.",
            icon: <Waves className="w-6 h-6 text-accent" />
        },
        {
            title: "Restauranger & Nöje",
            desc: "Efterskidåkning, fine dining, eller en snabb bit mat. Trysil har allt för den hungrige skidåkaren.",
            icon: <Utensils className="w-6 h-6 text-accent" />
        },
    ];

    return (
        <div className="bg-background min-h-screen pt-12">

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Upptäck Trysil</h1>
                <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                <p className="max-w-3xl mx-auto text-text-muted text-lg leading-relaxed">
                    Oavsett om du söker adrenalinfylld åkning, lugna promenader i längdspåret,
                    eller avkoppling vid ett förstklassigt spa, erbjuder Trysil en vinterupplevelse i världsklass.
                </p>
            </div>

            {/* Grid Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 relative z-10">
                    {activities.map((act) => (
                        <div key={act.title} className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                                {act.icon}
                            </div>
                            <h3 className="text-xl font-serif text-primary mb-3">{act.title}</h3>
                            <p className="text-text-muted text-sm leading-relaxed">{act.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Informative Text Section */}
                <div className="bg-primary text-white rounded-sm p-8 md:p-16 text-center space-y-6 animate-slide-up shadow-xl relative overflow-hidden">
                    {/* Fallback pattern overlay to add texture */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    <h2 className="text-3xl font-serif z-10 relative">Boka Liftkort i Förväg</h2>
                    <p className="max-w-2xl mx-auto text-gray-300 relative z-10 leading-relaxed">
                        Vi rekommenderar starkt att du köper dina liftkort online via Skistars officiella hemsida
                        för smidigare access till backen. Från vår stuga kan du glida rakt ut till närmaste nedfart.
                    </p>
                    <div className="pt-4 relative z-10">
                        <a
                            href="https://www.skistar.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-accent hover:bg-[#a88258] text-white px-8 py-3 rounded-sm text-sm uppercase tracking-widest transition-colors"
                        >
                            Gå till Skistar
                        </a>
                    </div>
                </div>

            </div>

        </div>
    );
}
