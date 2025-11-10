
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnection";
import userModel from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();

        if (!session || !session?.user?.id) {
            return NextResponse.json({ success: false, errorType: "Unauthorized", message: "User not found or unauthorized access.", });
        }

        await dbConnect();

        const user = await userModel.findById(session?.user?.id).select("-password");

        if (!user) {
            return NextResponse.json({ success: false, errorType: "Unauthorized", message: "User not found.", });
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("❌ [GET /api/auth/[userId]] Internal Server Error:", error.message);
        return NextResponse.json({ success: false, errorType: "Server Error", message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred", });
    }
}
