import dbConnect from "@/lib/db/dbConnect";
import Blog from "@/Modals/Blog";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const userId = formData.get("userId");
    const userName = formData.get("userName");
    const userEmail = formData.get("userEmail");
    const blogTitle = formData.get("blogTitle");
    const thumbnailImage = formData.get("thumbnailImage");
    const blogData = formData.get("blogData");
    const tags = formData.get("tags");

    if (!(userId && userName && userEmail && blogData && blogTitle)) {
      return NextResponse.json({
        message: "failed",
        status: 401,
        error: "required fields are missing",
      });
    }

    await dbConnect();

    if (thumbnailImage && typeof thumbnailImage.arrayBuffer === "function") {
      // Read and optimize the image using sharp
      const buffer = Buffer.from(await thumbnailImage.arrayBuffer());
      const optimizedImage = await sharp(buffer)
        .resize(800, 800, { fit: "cover" }) // Resize within 800x800 dimensions
        .webp({ quality: 75 }) // Convert to JPEG with quality setting
        .toBuffer();

      // Upload optimized image to Cloudinary
      const uploadStream = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "blogThumbnails", resource_type: "image" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          Readable.from(optimizedImage).pipe(stream);
        });

      const result = await uploadStream();

      const blog = new Blog({
        userId,
        author: userName,
        userEmail,
        title: blogTitle,
        blogData,
        thumbnail: result.secure_url,
        cloudinaryImgId: result.public_id,
        tags,
      });
      await blog.save();

      return NextResponse.json({
        message: "success",
        status: 200,
        blog,
      });
    }

    const blog = new Blog({
      userId,
      author: userName,
      userEmail,
      title: blogTitle,
      blogData,
      tags,
    });
    await blog.save();

    return NextResponse.json({
      message: "success",
      status: 200,
      blog,
    });
  } catch (error) {
    console.error("some error occurred:", error);
    return NextResponse.json({
      message: "failed",
      status: 401,
      error: error.message,
    });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || 1, 10); // Default to page 1 if not provided
    const limit = parseInt(url.searchParams.get("limit") || 6, 10);
    const skip = (page - 1) * limit;

    // Fetch posts sorted by creation date (most recent first) with pagination
    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    // Count total documents for pagination metadata
    const totalBlogs = await Blog.countDocuments();

    return NextResponse.json({
      message: "success",
      status: 200,
      blogs: recentBlogs,
      pagination: {
        totalBlogs: totalBlogs,
        page,
        totalPages: Math.ceil(totalBlogs / limit),
      },
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

export async function PATCH(request) {
  try {
    const formData = await request.formData();
    const _id = formData.get("_id");
    const blogTitle = formData.get("blogTitle");
    const thumbnailImage = formData.get("thumbnailImage");
    const cloudinaryImgId = formData.get("cloudinaryImgId");
    const blogData = formData.get("blogData");
    const tags = formData.get("tags");

    if (!(_id && blogData && blogTitle)) {
      return NextResponse.json({
        message: "failed",
        status: 401,
        error: "required fields are missing",
      });
    }

    await dbConnect();
    const findBlog = await Blog.findOne({ _id });

    if (findBlog) {
      if (thumbnailImage && typeof thumbnailImage.arrayBuffer === "function") {
        // Read and optimize the image using sharp
        const buffer = Buffer.from(await thumbnailImage.arrayBuffer());
        const optimizedImage = await sharp(buffer)
          .resize(800, 800, { fit: "cover" }) // Resize within 800x800 dimensions
          .webp({ quality: 75 }) // Convert to JPEG with quality setting
          .toBuffer();

        // Upload optimized image to Cloudinary
        const uploadStream = () =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "blogThumbnails", resource_type: "image" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
            Readable.from(optimizedImage).pipe(stream);
          });

        const result = await uploadStream();

        if (result) {
          if (cloudinaryImgId === "blogThumbnails/xx2hx6zxikt655agxoab") {
            const updatedBlog = {
              title: blogTitle,
              blogData,
              thumbnail: result.secure_url,
              cloudinaryImgId: result.public_id,
              tags,
            };
            const savedBlog = await Blog.findOneAndUpdate(
              { _id: findBlog._id },
              updatedBlog,
              { new: true }
            );
            return NextResponse.json({
              message: "success",
              status: 200,
              blog: savedBlog,
            });
          }

          if (cloudinaryImgId !== "blogThumbnails/xx2hx6zxikt655agxoab") {
            const deletePreviousImage = await cloudinary.uploader.destroy(
              cloudinaryImgId
            );

            const updatedBlog = {
              title: blogTitle,
              blogData,
              thumbnail: result.secure_url,
              cloudinaryImgId: result.public_id,
              tags,
            };
            const savedBlog = await Blog.findOneAndUpdate(
              { _id: findBlog._id },
              updatedBlog,
              { new: true }
            );
            return NextResponse.json({
              message: "success",
              status: 200,
              blog: savedBlog,
            });
          }
        }
      }

      const updatedBlog = {
        title: blogTitle,
        blogData,
        tags,
      };
      const savedBlog = await Blog.findOneAndUpdate(
        { _id: findBlog._id },
        updatedBlog,
        { new: true }
      );
      return NextResponse.json({
        message: "success",
        status: 200,
        blog: savedBlog,
      });
    } else {
      return NextResponse.json({
        message: "failed",
        status: 401,
        error: "No blog found with this id",
      });
    }
  } catch (error) {
    console.error("some error occurred:", error);
    return NextResponse.json({
      message: "failed",
      status: 401,
      error: error.message,
    });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const _id = url.searchParams.get("id");
    const findBlog = await Blog.findOne({ _id });
    if (findBlog) {
      if (findBlog.cloudinaryImgId !== "blogThumbnails/xx2hx6zxikt655agxoab") {
        const deleteImage = await cloudinary.uploader.destroy(
          findBlog.cloudinaryImgId
        );
      }
      const deletedBlog = await Blog.deleteOne({ _id });
      return NextResponse.json({
        message: "success",
        status: 200,
        blog: deletedBlog,
      });
    }
    return NextResponse.json({
      message: "failed",
      status: 401,
      error: "No blog found with this id",
    });
  } catch (error) {
    console.error("some error occurred:", error);
    return NextResponse.json({
      message: "failed",
      status: 401,
      error: error.message,
    });
  }
}
