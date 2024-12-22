"use client";
import NoPostFound from "./NoPostFound/NoPostFound";
import dynamic from "next/dynamic";
import UseGlobalContext from "@/customHooks/UseGlobalContext";
import CircularSpinner from "../Loaders/CircularSpinner";
import { memo, useEffect, useState } from "react";
import axios from "axios";
const BlogCard = dynamic(() => import("./Cards/BlogCard"), {
  loading: () => <CircularSpinner />,
});

const AllBlogPosts = ({ currentPage = 1 }) => {
  const globalContext = UseGlobalContext();
  const { blogsData, limit } = globalContext.globalState;
  const allBlogs = blogsData;
  const { dispatch } = globalContext;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `/api/?page=${currentPage}&limit=${limit}`
      );
      const { message, pagination, blogs } = data;
      if (message === "success") {
        dispatch({ type: "SET_BLOGS_DATA", blogs, pagination, currentPage });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  if (loading)
    return (
      <div className="min-h-[80vh] w-full flex items-center justify-center">
        <CircularSpinner />
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-2xl text-secondary-foreground">
        Error: {error}
      </div>
    );
  return (
    <div className="w-full border-b border-secondary-foreground">
  
      <div className="w-full md:hidden">
        {allBlogs?.length >= 1 ? (
          allBlogs?.map((currentPost) => (
            <BlogCard
              key={currentPost?._id}
              post={currentPost}
              style="horizontal"
            />
          ))
        ) : (
          <NoPostFound />
        )}
      </div>

      {/* For Medium and Large screens */}
      <section className="hidden w-full md:flex flex-wrap">
        {allBlogs?.length >= 1 ? (
          allBlogs?.map((currentPost) => (
            <div key={currentPost?._id} className="w-1/2 xl:w-1/3 p-3">
              <BlogCard post={currentPost} style="horizontal" />
            </div>
          ))
        ) : (
          <NoPostFound />
        )}
      </section>
    </div>
  );
};

export default memo(AllBlogPosts);
