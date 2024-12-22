import dbConnect from "@/lib/db/dbConnect";
import Blog from "@/Modals/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const limit = 5;
    // Fetch posts sorted by creation date (most recent first) with pagination
    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
    if (recentBlogs) {
      return NextResponse.json({
        message: "success",
        status: 200,
        blogsData: recentBlogs,
      });
    }
    return NextResponse.json({
      message: "failed",
      status: 401,
      error: "No Recent blogs found",
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({
      message: "failed",
      status: 500,
      error: error.message,
    });
  }
}
