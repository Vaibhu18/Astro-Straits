import { ArrowRight, Globe, Rocket, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CtaSection = () => {
    return (
        <section className="relative py-10 px-6 text-center">
            <div className="max-w-6xl mx-auto">
                <div className="inline-flex items-center gap-3 px-6 py-3 mb-3">
                    <Rocket className="w-6 h-6 text-yellow-400" />
                    <span className="text-sm font-semibold text-purple-500">READY TO BEGIN YOUR JOURNEY</span>
                </div>

                <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-5 text-start md:text-center">
                    Your Cosmic Journey Awaits
                </h2>
                <p className="text-gray-500 text-[15px] max-w-3xl mx-auto leading-relaxed mb-5">
                    Join thousands who have discovered their true path with Astrona.
                    Let the stars guide you to your highest potential and deepest fulfillment.
                </p>

                <div className="flex md:flex-wrap justify-between md:justify-center gap-2 md:gap-6 text-sm font-medium">
                    <Link
                        href="/signup"
                        className="group relative px-2 md:px-10 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 hover:from-indigo-400 hover:via-purple-400 hover:to-violet-400 text-white rounded-lg shadow-2xl shadow-purple-500/30 hover:scale-105 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="relative flex items-center gap-1 md:gap-4">
                            <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                            <span className="">Create Free Account</span>
                            <ArrowRight className="w-5 h-5 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>
                    </Link>

                    <Link
                        href="/about"
                        className="group px-2 md:px-10 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 backdrop-blur-sm transition-all duration-500 flex items-center gap-1 md:gap-4 hover:scale-105"
                    >
                        <Globe className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        <span className="">Learn More</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CtaSection