import dbConnect from "@/lib/db/dbConnect";
import Blog from "@/Modals/Blog";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get("page") || 1, 10); // Default to page 1 if not provided
    let userId = url.searchParams.get("userId");
    const limit = parseInt(url.searchParams.get("limit") || 10, 10);
    const skip = (page - 1) * limit;
    const userBlogs = await Blog.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    // Count total documents for pagination metadata
    const totalBlogs = await Blog.countDocuments({ userId });

    if (userBlogs && totalBlogs) {
      return NextResponse.json({
        message: "success",
        status: 200,
        userBlogs: userBlogs,
        pagination: {
          totalBlogs: totalBlogs,
          page,
          totalPages: Math.ceil(totalBlogs / limit),
        },
      });
    }

    return NextResponse.json({
      message: "failed",
      status: 401,
      error: "No data found",
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
