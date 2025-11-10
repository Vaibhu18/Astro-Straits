import { BookOpen, Briefcase, Crown, Rocket, Star, Target } from 'lucide-react';
import React, { Activity } from 'react'

const CosmicSection = () => {
    return (
        <section className="relative py-10 px-6 ">
            <div className="max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 mb-3">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    <span className="text-sm font-semibold text-purple-500">COSMIC PROFILE</span>
                </div>

                <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-5 text-start md:text-center">
                    Your Celestial Blueprint
                </h2>
                <p className="text-gray-600 text-[15px] max-w-3xl mx-auto mb-10 leading-relaxed">
                    Mira interprets your astrological chart through a comprehensive self-awareness model combining ancient wisdom with modern psychology
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <EnhancedCosmicCard
                        icon={<Star className="w-5 h-5 md:w-10 md:h-10" />}
                        title="Personality Core"
                        description="Sun and Ascendant signs defining your essential nature and outward expression"
                        color="text-yellow-400"
                        progress={85}
                    />
                    <EnhancedCosmicCard
                        icon={<Briefcase className="w-5 h-5 md:w-10 md:h-10" />}
                        title="Career Destiny"
                        description="Jupiter and Saturn guiding your professional path and karmic lessons"
                        color="text-blue-400"
                        progress={78}
                    />
                    <EnhancedCosmicCard
                        icon={<Activity className="w-5 h-5 md:w-10 md:h-10" />}
                        title="Inner Strength"
                        description="Mars and Mercury powering your will, drive, and intellectual capabilities"
                        color="text-green-400"
                        progress={92}
                    />
                    <EnhancedCosmicCard
                        icon={<BookOpen className="w-5 h-5 md:w-10 md:h-10" />}
                        title="Soul Passions"
                        description="Moon and Venus revealing emotional needs, joys, and relationship patterns"
                        color="text-pink-400"
                        progress={88}
                    />
                    <EnhancedCosmicCard
                        icon={<Target className="w-5 h-5 md:w-10 md:h-10" />}
                        title="Growth Areas"
                        description="Compassionate identification of evolutionary goals and healing opportunities"
                        color="text-red-400"
                        progress={75}
                    />
                    <EnhancedCosmicCard
                        icon={<Rocket className="w-5 h-5 md:w-10 md:h-10" />}
                        title="Divine Opportunities"
                        description="Rahu and Jupiter marking life's turning points and expansion possibilities"
                        color="text-indigo-400"
                        progress={95}
                    />
                </div>
            </div>
        </section>
    )
}

export default CosmicSection

const EnhancedCosmicCard = ({ icon, title, description, color, progress }) => (
    <div className="group relative p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
        <div className={`mb-3 transform group-hover:scale-110 transition-transform duration-500 ${color}`}>
            {icon}
        </div>

        <h3 className="text-xl font-bold mb-3 text-gray-700">{title}</h3>
        <p className="text-gray-500 text-sm mb-6">{description}</p>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div
                className="h-2 rounded-full bg-gradient-to-r from-current to-transparent transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
        <div className="text-right">
            <span className="text-xs text-gray-400">{progress}% Alignment</span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
);