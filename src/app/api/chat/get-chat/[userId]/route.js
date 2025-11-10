import dbConnect from "@/lib/dbConnection";
import chatModel from "@/models/Chat";
import messageModel from "@/models/Message";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(res, { params }) {
    try {
        const { userId } = await params;

        await dbConnect();

        const user = await UserModel.findById({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ success: false, errorType: "Unauthorized", message: "User not found or not logged in.", });
        }

        const chat = await chatModel.findOne({ userId });

        return NextResponse.json({ success: true, chat })
    } catch (error) {
        console.error("❌ [PUT /api/chat/new-chat] Error:", error);
        return NextResponse.json({ success: false, errorType: "Server Error", message: "Internal server error. Please try again later.", error: error.message, })
    }
}