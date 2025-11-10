"use client";

import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { generateResponse } from "@/utils/apiServices";
import { SendHorizontal, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";


const Chat = () => {
    const router = useRouter();
    const bottomRef = useRef(null);
    const { user } = useAuth();
    const { chat, messages, addNewMessage } = useChat();

    const [message, setMessage] = useState("");
    const [generatingLoading, setGeneratingLoading] = useState(false);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, generatingLoading]);

    const handleMessage = async () => {

        if (!user.isOnborded) {
            toast.error(<h1 className="text-red-500 font-semibold">Incomplete Information</h1>, {
                description: <span className="font-medium text-black"> You are under onboarding — please complete your onboarding process.</span>,
                duration: 4000,
            });
            router.replace("/onbording");
            return;
        }

        if (!message.trim()) return;

        if (message.length < 5) {
            toast.error(<h1 className="text-red-500 font-semibold">Incomplete Information</h1>, {
                description: <span className="font-medium text-black"> Your message is too short — please type at least 5 characters.</span>,
                duration: 4000,
            });
            return;
        }

        // Show user message instantly
        addNewMessage({ content: message, role: "user" });
        setGeneratingLoading(true);

        try {
            const newMessage = await generateResponse(chat?._id, { role: "user", content: message });
            addNewMessage(newMessage.message)
        } catch (error) {
            toast.error(<h1 className="text-red-500 font-semibold">AI Error</h1>, {
                description: <span className="font-medium text-black"> faield to generate AI Response</span>,
                duration: 4000,
            });
        } finally {
            setGeneratingLoading(false);
            setMessage("");
        }
    };

    return (
        <div className="relative w-full md:max-w-3xl h-[90vh] mx-auto bg-white rounded-lg shadow-sm">
            {/* Chat Messages */}
            <div className="h-[83vh] overflow-y-auto scroll-smooth p-4 space-y-4 bg-gray-50">
                {messages.length === 0 && (
                    <div className="h-full flex justify-center items-center text-gray-400">
                        <p className="text-lg font-medium">Start your first chat ✨</p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[75%] px-4 py-2 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === "user"
                                ? "bg-indigo-600 text-white rounded-br-none"
                                : "bg-gray-200 text-gray-800 rounded-bl-none"
                                }`}
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={rehypeHighlight}
                            >
                                {msg.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}

                {/* AI is typing... */}
                {generatingLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-700 rounded-2xl rounded-bl-none px-4 py-2 text-sm italic animate-pulse">
                            AI is thinking...
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Message Input */}
            <div className="absolute bottom-2 w-full px-3">
                <div className="flex gap-3 items-center">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        disabled={generatingLoading}
                        className={`flex-1 h-12 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 ${generatingLoading ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                    />
                    <button
                        type="submit"
                        disabled={generatingLoading || !message.trim()}
                        onClick={handleMessage}
                        className={`w-12 h-12 rounded-full flex justify-center items-center transition-colors ${generatingLoading || !message.trim()
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                    >
                        {generatingLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <SendHorizontal size={18} className="-rotate-45" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
