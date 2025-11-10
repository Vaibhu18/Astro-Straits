import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected successfully");
    return;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message)
  }
};

export default dbConnect;
