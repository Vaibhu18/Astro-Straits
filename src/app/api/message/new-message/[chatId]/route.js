import dbConnect from "@/lib/dbConnection";
import chatModel from "@/models/Chat";
import messageModel from "@/models/Message";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    try {
        const { chatId } = await params;
        const { role, content } = await req.json();

        await dbConnect();

        const chat = await chatModel.findById(chatId);

        if (!chat) {
            return NextResponse.json({ success: false, errorType: "Bad Request", message: "Chat not found or may deleted.", });
        }

        const message = await messageModel.create({ chatId: chat._id, content, role });
        chat.messages.push(message._id);
        await chat.save();

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error("❌ [PUT /api/message/new-message] Error:", error);
        return NextResponse.json({ success: false, errorType: "Server Error", message: "Internal server error. Please try again later.", error: error.message, })
    }
}