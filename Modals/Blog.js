import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, default: "" },
    userId: { type: String, required: true, default: "" },
    userEmail: { type: String, required: true, default: "" },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 100,
      default: "",
    },
    thumbnail: {
      type: String,
      default:
        "https://res.cloudinary.com/dzxjftbo3/image/upload/v1734247619/blogThumbnails/xx2hx6zxikt655agxoab.webp",
    },
    cloudinaryImgId: {
      type: String,
      default: "blogThumbnails/xx2hx6zxikt655agxoab",
    },
    blogData: { type: String, required: true, default: "" },
    tags: { type: String, default: "" },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;
