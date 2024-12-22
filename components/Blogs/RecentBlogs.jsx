"use client";
import axios from "axios";
import CircularSpinner from "../Loaders/CircularSpinner";
import dynamic from "next/dynamic";
import NoPostFound from "./NoPostFound/NoPostFound";
import { useEffect, useState } from "react";
import UseGlobalContext from "@/customHooks/UseGlobalContext";
const BlogCard = dynamic(() =>
  import("./Cards/BlogCard", { loading: () => <CircularSpinner /> })
);

const RecentBlogs = () => {
  const globalContext = UseGlobalContext();
  const { dispatch, globalState } = globalContext;
  const { recentBlogsData } = globalState;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/recentblogs`);
        const { message, blogsData } = await data;
        if (message === "success") {
          dispatch({ type: "SET_RECENT_BLOGS_DATA", blogsData });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularSpinner />;
  if (error)
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-2xl text-secondary-foreground">
        Error: {error}
      </div>
    );

  return (
    <div className="w-full px-8 py-7">
      <span className="py-8 text-2xl text-secondary-foreground inline-block">
        Recent blog posts
      </span>
      {/* For Small Devices */}
      <section className="w-full md:hidden">
        {recentBlogsData?.length >= 1 ? (
          recentBlogsData?.map((currentPost) => (
            <BlogCard
              key={currentPost?._id}
              post={currentPost}
              style="horizontal"
            />
          ))
        ) : (
          <NoPostFound />
        )}
      </section>

      {/* For Medium screens */}
      <section className="hidden w-full md:flex flex-col  2xl:hidden">
        {recentBlogsData?.[0] ? (
          <BlogCard post={recentBlogsData?.[0]} style="horizontal" />
        ) : (
          <NoPostFound />
        )}
        {recentBlogsData?.[1] && (
          <BlogCard post={recentBlogsData?.[1]} style="vertical" />
        )}
        {recentBlogsData?.[2] && (
          <BlogCard post={recentBlogsData?.[2]} style="vertical" />
        )}
        {recentBlogsData?.[3] && (
          <BlogCard post={recentBlogsData?.[3]} style="vertical" />
        )}
        {recentBlogsData?.[4] && (
          <BlogCard post={recentBlogsData?.[4]} style="horizontal" />
        )}
      </section>

      {/* For Larger Screens */}
      <section className="hidden w-full  2xl:flex flex-col">
        <div className="w-full flex gap-3 p-1 justify-center">
          <div className="w-1/2 flex">
            {recentBlogsData?.[0] ? (
              <BlogCard post={recentBlogsData?.[0]} style="horizontal" />
            ) : (
              <NoPostFound />
            )}
          </div>
          <div className="w-1/2 flex flex-col">
            {recentBlogsData?.[1] && (
              <BlogCard post={recentBlogsData?.[1]} style="vertical" />
            )}
            {recentBlogsData?.[2] && (
              <BlogCard post={recentBlogsData?.[2]} style="vertical" />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col">
          {recentBlogsData?.[3] && (
            <BlogCard post={recentBlogsData?.[3]} style="largeVertical" />
          )}
          {recentBlogsData?.[4] && (
            <BlogCard post={recentBlogsData?.[4]} style="largeVertical" />
          )}
        </div>
      </section>
    </div>
  );
};

export default RecentBlogs;
