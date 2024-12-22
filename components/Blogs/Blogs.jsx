"use client";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import UseGlobalContext from "@/customHooks/UseGlobalContext";
import CircularSpinner from "../Loaders/CircularSpinner";
import dynamic from "next/dynamic";
const AllBlogPosts = dynamic(() =>
  import("./AllBlogPosts", { loading: () => <CircularSpinner /> })
);
const BlogsPagination = dynamic(() => import("./Pagination/BlogsPagination"), {
  loading: () => <CircularSpinner />,
});

const Blogs = ({ currentPage, limit }) => {
  // const globalContext = UseGlobalContext();
  // const { dispatch } = globalContext;
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `/api/?page=${currentPage}&limit=${limit}`
  //       );
  //       const { message, pagination, blogs } = data;
  //       if (message === "success") {
  //         dispatch({ type: "SET_BLOGS_DATA", blogs, pagination, currentPage });
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [currentPage]);

  // if (loading)
  //   return (
  //     <div className="min-h-[80vh] w-full flex items-center justify-center">
  //       <CircularSpinner />
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div className="min-h-screen w-full flex items-center justify-center text-2xl text-secondary-foreground">
  //       Error: {error}
  //     </div>
  //   );

  return (
    <section className="w-full px-8 py-7 flex flex-col">
      <AllBlogPosts />
      <BlogsPagination />
    </section>
  );
};

export default memo(Blogs);
