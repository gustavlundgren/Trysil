import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-background min-h-screen pt-12 pb-24">

            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Kontakta Oss</h1>
                <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                <p className="text-text-muted text-lg leading-relaxed">
                    Har du frågor inför din bokning eller önskar mer information?
                    Tveka inte att höra av dig till oss!
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Contact Details */}
                    <div>
                        <h2 className="text-3xl font-serif text-primary mb-8">Hör av dig</h2>
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-accent max-[400px]:hidden">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-text">Telefon</h3>
                                    <p className="text-text-muted">+46 70 123 45 67</p>
                                    <p className="text-xs text-text-muted mt-1">Vi svarar alla dagar 08:00 - 20:00</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-accent max-[400px]:hidden">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-text">E-post</h3>
                                    <p className="text-text-muted">hej@trysilcabin.se</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-accent max-[400px]:hidden">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-text">Adress</h3>
                                    <p className="text-text-muted">Fageråsen 100</p>
                                    <p className="text-text-muted">2420 Trysil, Norge</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-sm">
                        <h2 className="text-2xl font-serif text-primary mb-6">Skicka meddelande</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-text mb-2" htmlFor="name">
                                    Fullständigt Namn
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-accent focus:border-accent outline-none transition-colors"
                                    placeholder="Karl Karlsson"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text mb-2" htmlFor="email">
                                    E-postadress
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-accent focus:border-accent outline-none transition-colors"
                                    placeholder="din@epost.se"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text mb-2" htmlFor="message">
                                    Meddelande
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-accent focus:border-accent outline-none transition-colors resize-none"
                                    placeholder="Hur kan vi hjälpa dig?"
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-primary text-white py-4 rounded-sm hover:-translate-y-1 hover:shadow-lg transition-all uppercase tracking-widest text-sm"
                            >
                                Skicka Meddelande
                            </button>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    );
}
