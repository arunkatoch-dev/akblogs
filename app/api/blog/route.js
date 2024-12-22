import dbConnect from "@/lib/db/dbConnect";
import Blog from "@/Modals/Blog";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const _id = url.searchParams.get("_id");

    const blog = await Blog.findOne({ _id });

    if (blog) {
      return NextResponse.json({
        message: "success",
        status: 200,
        blog,
      });
    }

    return NextResponse.json({
      message: "failed",
      status: 401,
      error: "No blog found with this id",
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
