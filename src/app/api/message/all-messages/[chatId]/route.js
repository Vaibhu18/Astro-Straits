import dbConnect from "@/lib/dbConnection";
import chatModel from "@/models/Chat";
import messageModel from "@/models/Message";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { chatId } = await params;

        await dbConnect();

        const chat = await chatModel.findById(chatId);

        if (!chat) {
            return NextResponse.json({ success: false, errorType: "Bad Request", message: "Chat not found or may deleted.", });
        }

        const messages = await messageModel.find({ chatId: chat._id }) || [];

        return NextResponse.json({ success: true, messages });
    } catch (error) {
        console.error("❌ [PUT /api/message/all-messages] Error:", error);
        return NextResponse.json({ success: false, errorType: "Server Error", message: "Internal server error. Please try again later.", error: error.message, })
    }
}