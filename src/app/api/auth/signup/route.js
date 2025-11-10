import dbConnect from "@/lib/dbConnection";
import { signupValidation } from "@/utils/signupValidation";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import UserModel from "@/models/User";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        const validationResponse = signupValidation(name, email, password);

        if (!validationResponse.success) {
            return NextResponse.json({ ...validationResponse });
        }

        await dbConnect();

        const existingUser = await UserModel.findOne({ email: validationResponse.data.email })

        if (existingUser) {
            return NextResponse.json({ success: false, errorType: "Conflict", message: "Email already registered. Please use another email." })
        }

        const hashedPassword = await bcrypt.hash(validationResponse.data.password, 10);

        const user = await UserModel.create({ name: validationResponse.data.name, email: validationResponse.data.email, password: hashedPassword });

        return NextResponse.json({ success: true, message: "Account created successfully. Welcome to Astro Straits!" });
    } catch (error) {
        console.error("❌ [POST /api/auth/signup] Internal Server Error:", error.message);
        return NextResponse.json({ success: false, errorType: "Server Error", message: "Internal server error. Please try again later.", error: error?.message || "Unknown error occurred", });
    }
}