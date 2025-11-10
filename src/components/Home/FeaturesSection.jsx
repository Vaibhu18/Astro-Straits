import { BrainCircuit, Calendar, Compass, Heart, Moon, Stars, Zap } from 'lucide-react';
import React from 'react'

const FeaturesSection = () => {
    return (
        <section className="relative py-10 px-4 ">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-5 md:mb-10">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 mb-5">
                        <BrainCircuit className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-semibold text-purple-500">AI-POWERED INSIGHTS</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-5 text-start md:text-center">
                        Cosmic Wisdom Unleashed
                    </h2>
                    <p className="text-gray-500 text-[15px] max-w-3xl mx-auto leading-relaxed">
                        Experience the future of astrology with AI-powered insights that understand your unique energy signature and life path
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                    <EnhancedFeatureCard
                        icon={<Stars className="w-5 h-5 md:w-6 md:h-6" />}
                        title="AI Birth Chart Analysis"
                        description="Deep neural network analysis of your cosmic blueprint with unprecedented precision and depth"
                        gradient="from-purple-500 to-pink-500"
                        features={["Planetary Positions", "House Analysis", "Aspect Patterns"]}
                    />
                    <EnhancedFeatureCard
                        icon={<Heart className="w-5 h-5 md:w-6 md:h-6" />}
                        title="Love Compatibility"
                        description="Discover soul connections and relationship harmony through advanced synastry analysis"
                        gradient="from-pink-500 to-rose-500"
                        features={["Soulmate Matching", "Relationship Dynamics", "Emotional Compatibility"]}
                    />
                    <EnhancedFeatureCard
                        icon={<Calendar className="w-5 h-5 md:w-6 md:h-6" />}
                        title="Daily Guidance"
                        description="Personalized horoscopes and actionable insights tailored to your daily cosmic energy"
                        gradient="from-yellow-500 to-orange-500"
                        features={["Daily Forecast", "Lucky Timing", "Energy Peaks"]}
                    />
                    <EnhancedFeatureCard
                        icon={<Moon className="w-5 h-5 md:w-6 md:h-6" />}
                        title="Spiritual Coaching"
                        description="Mindful insights and practices for emotional balance, growth, and spiritual awakening"
                        gradient="from-indigo-500 to-blue-500"
                        features={["Meditation Guides", "Energy Work", "Shadow Integration"]}
                    />
                    <EnhancedFeatureCard
                        icon={<Compass className="w-5 h-5 md:w-6 md:h-6" />}
                        title="Life Path Reading"
                        description="Uncover your true purpose, destiny, and soul mission through comprehensive analysis"
                        gradient="from-green-500 to-teal-500"
                        features={["Soul Purpose", "Career Path", "Life Lessons"]}
                    />
                    <EnhancedFeatureCard
                        icon={<Zap className="w-5 h-5 md:w-6 md:h-6" />}
                        title="Real-time Insights"
                        description="Instant answers to your cosmic questions with live planetary transit analysis"
                        gradient="from-blue-500 to-purple-500"
                        features={["Live Transits", "Quick Questions", "Instant Guidance"]}
                    />
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection

// Enhanced Components
const EnhancedFeatureCard = ({ icon, title, description, gradient, features }) => (
    <div className="group relative p-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 hover:border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className={`inline-flex items-center justify-center w-12 h-12 md:w-15 md:h-15 mb-3 bg-gradient-to-r ${gradient} rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg text-white`}>
            {icon}
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-2 relative z-10">{title}</h3>
        <p className="text-gray-500 text-[16px] mb-3 relative z-10">{description}</p>

        <div className="space-y-2 relative z-10">
            {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                    {feature}
                </div>
            ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
);