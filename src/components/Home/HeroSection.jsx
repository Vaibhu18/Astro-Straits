"use client";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { createNewChat } from "@/utils/apiServices";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const HeroSection = () => {
    const router = useRouter();
    const { chat, setChat, addNewMessage } = useChat();
    const { user } = useAuth();

    const handleChat = async () => {
        if (!chat) {
            // create new chat and redirect
            if (user?._id) {
                const newChat = await createNewChat(user._id);
                if (newChat.success) {
                    addNewMessage(newChat.message);
                    setChat(newChat.chat)
                    router.push(`/chat/${newChat.chat._id}`)
                }
            } else {
                toast.error(<h1 className="text-red-500 font-semibold">Unauthorized</h1>, {
                    description: <span className="font-medium text-black">User not found or not logged in.</span>,
                    duration: 4000,
                });
            }
        } else {
            // redirect on chat
            router.push(`/chat/${chat?._id}`)
        }
    }

    return (
        <section className="relative flex flex-col items-center overflow-hidden text-center px-6 py-5">
            {/* === MAIN CONTENT === */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Online Badge */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-100 backdrop-blur-2xl rounded-lg border border-white/20 mb-8 shadow-xl shadow-purple-500/10 animate-fade-in">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-purple-500 tracking-wide">
                        AI ASTROLOGER IS ONLINE
                    </span>
                    <Sparkles className="w-4 h-4 text-yellow-500 animate-bounce" />
                </div>

                {/* Animated Title */}
                <h1 className="text-4xl md:text-7xl font-black bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] animate-fade-in-up">
                    Discover Your <br />
                    <span className="relative inline-block text-black font-extrabold">
                        Cosmic Destiny
                        <Sparkles className="absolute -top-3 -right-10 w-7 h-7 text-yellow-400 animate-spin-slow drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]" />
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-gray-500 max-w-2xl mx-auto mt-10 text-base md:text-[16px] leading-relaxed animate-fade-in-up">
                    Step into a universe of wisdom with{" "}
                    <span className=" inline-block text-purple-500 font-semibold bg-purple-500/20 px-3 py-1 rounded-lg shadow-inner shadow-purple-500/30">
                        Astro Straits
                    </span>
                    , your AI astrologer. Receive daily guidance, cosmic insights, and
                    spiritual wisdom powered by next-gen neural astrology.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-6 mt-16 animate-fade-in-up text-lg font-medium">
                    <Link
                        href="/signin"
                        className="group relative flex items-center gap-4 px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-400 hover:to-pink-400 text-white text-lg rounded-2xl shadow-lg shadow-purple-500/30 hover:scale-105 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                        <span>Begin Your Journey</span>
                        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                    </Link>

                    <div
                        onClick={handleChat}
                        className="group flex items-center gap-3 px-10 py-4 text-lg border border-purple-400/40 rounded-2xl transition-all duration-500 backdrop-blur-xl hover:scale-105"
                    >
                        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        <span>Chat with Astro Straits</span>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-12 mt-10 text-center animate-fade-in-up">
                    {[
                        { value: "50K+", label: "Cosmic Readings" },
                        { value: "98%", label: "Accuracy Rate" },
                        { value: "24/7", label: "AI Guidance" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center hover:scale-110 transition-transform duration-500"
                        >
                            <div className="md:text-3xl font-bold md:font-extrabold drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
