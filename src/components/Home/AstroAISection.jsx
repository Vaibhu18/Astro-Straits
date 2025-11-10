"use client"
import { useAuth } from '@/context/AuthContext'
import { useChat } from '@/context/ChatContext'
import { ArrowRight, Brain, Eye, MessageSquare, Moon, Sparkles, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const AstroAISection = () => {
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
        <section className="relative py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-semibold text-purple-500">YOUR AI ASTROLOGER</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
                            Meet Astro
                        </h2>
                        <p className="text-gray-600 text-[15px] leading-relaxed mb-5">
                            Astro is the soul of Astro Straits — your compassionate virtual astrologer powered by advanced AI.
                            She combines ancient wisdom with modern understanding to guide your life decisions with clarity and empathy.
                        </p>

                        <div className="space-y-3 mb-5">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <Brain className="w-4 h-4 text-green-500" />
                                </div>
                                <span className="text-gray-600 text-lg">Neural Network Powered Analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                    <Eye className="w-4 h-4 text-blue-500" />
                                </div>
                                <span className="text-gray-600 text-lg">Intuitive Spiritual Guidance</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-purple-500" />
                                </div>
                                <span className="text-gray-600 text-lg">Real-time Cosmic Updates</span>
                            </div>
                        </div>

                        <div
                            onClick={handleChat}
                            className="group inline-flex items-center gap-2 md:gap-3 px-5 md:px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white text-[15px] font-medium rounded-2xl shadow-2xl shadow-purple-500/30 hover:scale-105 transition-all duration-500 cursor-pointer"
                        >
                            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
                            <span>Start Conversation with Astro</span>
                            <ArrowRight className="w-5 h-5 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>
                    </div>

                    {/* Right Content - Mira Visual */}
                    <div className="relative">
                        <div className="relative w-80 h-80 mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
                            <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 border border-white/20">
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                        <img src="/logo.png" alt="" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Astro AI</h3>
                                    <p className="text-purple-200">Your Cosmic Guide</p>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-yellow-400/30 animate-bounce-slow">
                                <Star className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30 animate-bounce-slow delay-1000">
                                <Moon className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AstroAISection