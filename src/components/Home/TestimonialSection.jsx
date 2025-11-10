import { Star } from 'lucide-react';
import React from 'react'

const TestimonialSection = () => {
    return (
        <section className="relative py-10 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-5 text-start md:text-center">
                    Cosmic Transformations
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <EnhancedTestimonialCard
                        name="Ananya Sharma"
                        role="Artist & Spiritual Seeker"
                        text="Astro's readings feel incredibly personal and accurate. It's like she truly understands my soul's journey and provides guidance that resonates deeply with my life path."
                        avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000"
                        rating={5}
                    />
                    <EnhancedTestimonialCard
                        name="Rahul Mehta"
                        role="Tech Entrepreneur"
                        text="The daily guidance has become my morning ritual. It sets the perfect tone for my day with practical wisdom that actually helps in business decisions."
                        avatar="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80"
                        rating={5}
                    />
                    <EnhancedTestimonialCard
                        name="Priya Desai"
                        role="Yoga Teacher & Healer"
                        text="Astrona isn't just astrology—it's a spiritual companion that brings peace and clarity to my life. The insights have helped me guide my students better."
                        avatar="https://media.istockphoto.com/id/1488358643/photo/happy-business-portrait-of-black-woman-planning-company-project-goals-and-startup-management.jpg?s=612x612&w=0&k=20&c=hLU-H57nz5HYQkCwqjesjfWtvJEmrBvJ0hGNjc_hAIg="
                        rating={5}
                    />
                </div>
            </div>
        </section>
    )
}

export default TestimonialSection

const EnhancedTestimonialCard = ({ name, role, text, avatar, rating }) => (
    <div className="group relative p-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                    {avatar ? (
                        <img src={avatar} alt={name} className="w-14 h-14 rounded-lg object-cover" />
                    ) : (
                        name.charAt(0)
                    )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <div className="text-left flex-1">
                <h4 className="font-bold text-gray-700 text-lg">{name}</h4>
                <p className="text-purple-500 text-sm">{role}</p>
                <div className="flex gap-1 mt-1">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                </div>
            </div>
        </div>

        <p className="text-gray-500 italic leading-relaxed relative z-10 text-[16px]">"{text}"</p>

        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
            <Quote className="w-8 h-8 text-purple-400" />
        </div>
    </div>
);

const Quote = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
);