import dbConnect from "@/lib/dbConnection";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        const { userId } = await params;
        const { name, gender, dob, birthTime, birthPlace } = await req.json();

        if (!name || !gender || !dob || !birthTime || !birthPlace) {
            return NextResponse.json({ success: false, errorType: "Validation Error", message: "All fields are required.", });
        }

        await dbConnect();

        const user = await UserModel.findByIdAndUpdate(userId, { name, gender, dob, birthTime, birthPlace, isOnborded: true }, { new: true });

        if (!user) {
            return NextResponse.json({ success: false, errorType: "Unauthorized", message: "User not found or not logged in.", });
        }

        return NextResponse.json({ success: true, message: "🎉 Onboarding successful! Welcome to Astro Straits, guided by Astra.", user })
    } catch (error) {
        console.error("❌ [PUT /api/user/onboard] Error:", error);
        return NextResponse.json({ success: false, errorType: "Server Error", message: "Internal server error. Please try again later.", error: error.message, })
    }
}