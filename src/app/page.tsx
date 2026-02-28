import Image from "next/image";
import Link from "next/link";
import { Snowflake, Flame, Mountain, Coffee } from "lucide-react";

export default function Home() {
  const features = [
    {
      name: "Ski in / Ski out",
      description: "Bara 100 meter till barnbacken vid Högfjällscentret.",
      icon: <Snowflake className="w-6 h-6 text-accent" />,
    },
    {
      name: "Mysig Braskamin",
      description: "Njut av en värmande brasa efter en lång dag i backen.",
      icon: <Flame className="w-6 h-6 text-accent" />,
    },
    {
      name: "Nära naturen",
      description: "Här kan ni koppla av i en lugn och naturnära fjällmiljö.",
      icon: <Mountain className="w-6 h-6 text-accent" />,
    },
    {
      name: "Praktiskt Kök",
      description: "Välutrustat kök, perfekt för härliga familjemiddagar.",
      icon: <Coffee className="w-6 h-6 text-accent" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center pt-0 mt-[-80px]">
        {/* Background Image Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Trysil Vinterstuga Exteriör"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-lg">
            Fjällstuga i <br />
            <span className="text-accent italic">Fageråsen</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Upplev en exklusiv vistelse i vår moderna längdstuga. Perfekt belägen för både alpin skidåkning och avkoppling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-accent hover:bg-[#a88258] text-white px-8 py-4 rounded-sm text-sm uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              Tillgänglighet & Bokning
            </Link>
            <Link
              href="/cabin"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-sm text-sm uppercase tracking-widest transition-all duration-300"
            >
              Utforska Stugan
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Varför välja vår stuga?</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature) => (
              <div key={feature.name} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:shadow-md transition-shadow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif text-primary mb-3">{feature.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
