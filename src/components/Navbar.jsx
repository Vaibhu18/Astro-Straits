"use client";
import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, Bot, MessageSquare, LogOut, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { createNewChat } from "@/utils/apiServices";
import { useChat } from "@/context/ChatContext";

const Navbar = () => {
    const router = useRouter();
    const { chat, setChat, addNewMessage } = useChat();
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

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

    const startChatting = async () => {
        setIsMobileMenuOpen(false);

    }

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isUserDropdownOpen && !event.target.closest('.user-dropdown')) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isUserDropdownOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[8vh] shadow-xl backdrop-blur-xl`}
            >
                <div className="h-full px-6 flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group cursor-pointer relative overflow-visible"
                    >
                        <div className="flex items-center gap-1">
                            <img src="/logo.png" alt="" className="w-10 h-10" />
                            <h1
                                className={`font-extrabold text-2xl md:text-3xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500 tracking-tight ${isScrolled ? "opacity-100" : "opacity-90"
                                    }`}
                            >
                                Astro Straits
                            </h1>

                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {user ? (
                            // Logged In
                            <div className="flex items-center gap-6 text-sm">
                                <button
                                    onClick={handleChat}
                                    className="relative group flex items-center gap-2 px-5 py-3 bg-linear-to-r from-indigo-600 to-purple-700 text-white font-medium rounded-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/40 overflow-hidden cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <MessageSquare className="w-5 h-5 relative z-10" />
                                    <span className="relative z-10">Chat with Astro</span>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-cyan-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                                </button>

                                {/* User Dropdown */}
                                <div className="relative user-dropdown border bg-gray-200 rounded-lg text-sm">
                                    <button
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="flex items-center gap-3 px-2 py-1 rounded-2xl bg-white/5 dark:bg-gray-800/50 border border-white/10 backdrop-blur-2xl hover:bg-white/10 transition-all duration-300 group"
                                    >
                                        <div className="relative">
                                            <div className="w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-950"></div>
                                        </div>
                                        <div className="text-left -space-y-1">
                                            <span className="text-gray-700 text-sm font-semibold block">
                                                {user?.name || "User"}
                                            </span>
                                            <span className="text-gray-600 text-xs">
                                                Premium
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`w-4 h-4 text-gray-700 transition-transform duration-300 ${isUserDropdownOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isUserDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-3 w-64 bg-gray-200 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-purple-500/10 py-3 transition-all duration-300 origin-top-right animate-in fade-in slide-in-from-top-5 px-3">
                                            <div className="px-4 py-3 border-b border-gray-300 text-center">
                                                <p className="text-gray-900 font-semibold">
                                                    {user?.name || "User"}
                                                </p>
                                                <p className="text-gray-800 text-sm truncate">
                                                    {user?.email || "user@example.com"}
                                                </p>
                                            </div>

                                            <div className="py-1">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 group rounded-lg"
                                                >
                                                    <User className="w-4 h-4" />
                                                    <span>Profile Settings</span>
                                                </Link>
                                                <Link
                                                    href="/subscription"
                                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 group rounded-lg"
                                                >
                                                    <Sparkles className="w-4 h-4" />
                                                    <span>Subscription</span>
                                                </Link>
                                            </div>

                                            <div className="border-t border-white/10">
                                                <button
                                                    onClick={() => signOut({ callbackUrl: "/" })}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all duration-200 group rounded-lg cursor-pointer"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Sign Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // Logged Out
                            <div className="flex items-center gap-8">
                                {/* Feature Badges */}
                                <div className="flex items-center gap-6 px-6 py-3 rounded-2xl border border-white/10">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="relative">
                                            <MessageSquare className="w-5 h-5 text-blue-600 drop-shadow-lg" />
                                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        </div>
                                        <span className="font-medium text-gray-600">Chat Freely</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Bot className="w-5 h-5 text-purple-500 drop-shadow-lg" />
                                        <span className="font-medium text-gray-600">AI Powered</span>
                                    </div>
                                </div>

                                {/* Auth Buttons */}
                                <div className="flex items-center gap-4 text-sm">
                                    <Link
                                        href="/signup"
                                        className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-indigo-400/60 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href="/signin"
                                        className="relative group px-6 py-2 bg-linear-to-r from-indigo-600 to-purple-700 text-white font-medium rounded-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/40 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        <div className="flex items-center gap-2 relative z-10">
                                            <Sparkles className="w-5 h-5" />
                                            <span>Get Started</span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-cyan-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-3 rounded-2xl backdrop-blur-2xl border bg-gray-100  hover:scale-105 transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-20 left-0 right-0 shadow-2xl bg-gray-200 shadow-purple-500/10 animate-in slide-in-from-top-5 duration-300">
                        <div className="px-6 py-6 space-y-4">
                            {user ? (
                                <>
                                    {/* User Info */}
                                    <div className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/5 dark:bg-gray-800/50 border border-white/10 mb-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                                <User className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-950"></div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-700 text-base font-semibold">
                                                {user?.name || "User"}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {user?.email || "user@example.com"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 text-sm font-medium">
                                        <Link
                                            href="/chat"
                                            className="w-full flex items-center justify-center gap-3 py-4 bg-linear-to-r from-indigo-600 to-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                                            onClick={() => startChatting()}
                                        >
                                            <MessageSquare className="w-5 h-5" />
                                            Start Chatting
                                        </Link>

                                        <button
                                            onClick={() => signOut({ callbackUrl: "/" })}
                                            className="w-full flex items-center justify-center gap-3 py-3 bg-[#ff000024] hover:bg-[#ff00002c] text-red-500 rounded-lg dark:hover:bg-red-950/20 transition-all duration-300 hover:scale-105"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Feature Badges */}
                                    <div className="flex items-center justify-around py-4 px-2 rounded-2xl bg-white/5 dark:bg-gray-800/50 border border-white/10 mb-4 font-medium">
                                        <div className="flex items-center gap-2 text-sm">
                                            <MessageSquare className="w-5 h-5 text-blue-500" />
                                            <span className="text-gray-700">Chat Freely</span>
                                        </div>
                                        <div className="w-px h-6 bg-white/20"></div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Bot className="w-5 h-5 text-purple-500" />
                                            <span className="text-gray-700">AI Powered</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 font-medium">
                                        <Link
                                            href="/signin"
                                            className="w-full py-4 rounded-lg bg-blue-300 hover:bg-blue-400 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-lg"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Sign In
                                        </Link>

                                        <Link
                                            href="/signup"
                                            className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-lg"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Sparkles className="w-5 h-5" />
                                            Get Started
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-20"></div>
        </>
    );
};

export default Navbar;