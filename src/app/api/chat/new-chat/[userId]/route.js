import dbConnect from "@/lib/dbConnection";
import chatModel from "@/models/Chat";
import messageModel from "@/models/Message";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(res, { params }) {
    try {
        const { userId } = await params;

        await dbConnect();

        const user = await UserModel.findById({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ success: false, errorType: "Unauthorized", message: "User not found or not logged in.", });
        }

        const chat = await new chatModel({ userId: user._id, title: "New Chat" });

        const welcomeMessage = `✨ Hi ${user.name}, I'm Astra — your personal AI astrologer. Let's explore your cosmic path together!`;

        const message = await messageModel.create({ chatId: chat._id, role: "assistant", content: welcomeMessage });

        chat.messages.push(message._id);

        await chat.save();

        return NextResponse.json({ success: true, chat, message })
    } catch (error) {
        console.error("❌ [PUT /api/chat/new-chat] Error:", error);
        return NextResponse.json({ success: false, errorType: "Server Error", message: "Internal server error. Please try again later.", error: error.message, })
    }
}