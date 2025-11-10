"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext";
import { getChatByUserId, getMessagesByChatId } from "@/utils/apiServices";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { user, loading } = useAuth();
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);

    useEffect(() => {
        const fetchChat = async () => {
            setChatLoading(true);
            const chatResponse = await getChatByUserId(user?._id);
            if (chatResponse.success) {
                setChat(chatResponse.chat)
            }
            setChatLoading(false);
        }
        user?._id && !loading && fetchChat();
    }, [user, loading])

    useEffect(() => {
        const fetchMessages = async () => {
            const messageResponse = await getMessagesByChatId(chat?._id);
            if (messageResponse.success) {
                setMessages(messageResponse.messages)
            }
        }

        chat?._id && fetchMessages();
    }, [chat]);

    const addNewMessage = (message) => {
        setMessages((prevChats) => [...prevChats, message]);
    }

    return <ChatContext.Provider value={{ chat, setChat, chatLoading, messages, addNewMessage }}>{children}</ChatContext.Provider>
}

export const useChat = () => useContext(ChatContext);