import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User";
import chatModel from "@/models/Chat";

export async function POST(req) {
    try {
        let { email, password } = await req.json();
        email = email?.trim();
        password = password?.trim();

        if (!email || !password) {
            return NextResponse.json({ success: false, errorType: "Bad Request", message: !email ? "Email is required." : "Password is required.", });
        }

        await dbConnect();

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, errorType: "Unauthorized", message: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ success: false, errorType: "Unauthorized", message: "Invalid email or password." });
        }

        const chat = await chatModel.findOne({ userId: user._id }).populate("userId");

        return NextResponse.json({ success: true, message: "Login successful.", user, chat })
    } catch (error) {
        console.error("❌ [POST /api/auth/signin] Internal Server Error:", error.message);
        return NextResponse.json({ success: false, errorType: "Server Error", message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred", });
    }
}