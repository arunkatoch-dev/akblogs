"use client";
import useStringTrim from "@/customHooks/UseStringTrim";
import React, { memo, useEffect, useState } from "react";
import parse from "html-react-parser";
import useArrayTrim from "@/customHooks/UseArrayTrim";
import CardTags from "./Cards/CardTags";
import Image from "next/image";
import axios from "axios";
import CircularSpinner from "../Loaders/CircularSpinner";

const DetailBlog = ({ blogID }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/blog/?_id=${blogID}`);
        const { message, blog } = response.data;
        if (message === "success") {
          setBlog([blog]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [blogID]);
  if (loading)
    return (
      <div className="w-full min-h-[80vh]">
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
    <div className="w-full py-7 md:px-4 px-2 flex justify-center items-center border rounded-md">
      {blog.length === 1 &&
        blog?.map((currBlog) => {
          const { _id, author, title, blogData, thumbnail, tags, createdAt } =
            currBlog;
          let blogTags = useArrayTrim(tags, 13);
          let timeStamp = useStringTrim(createdAt, 10);
          const formattedTimeStamp = timeStamp.split("-").reverse().join("-");
          return (
            <div
              className={`w-full flex-col gap-6 md:w-[90vw] px-4 md:px-0`}
              key={_id}
            >
              <div className={`w-full h-[300px] md:h-[500px] relative`}>
                {thumbnail !== "" && (
                  <Image
                    src={thumbnail}
                    alt="blog thumbnail"
                    fill
                    priority
                    className="object-cover"
                    sizes={`(max-width: 768px) 90vw, 95vw `}
                  />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between py-2 px-2 border-b border-b-secondary-foreground">
                  <span className="text-sm text-primary">{author}</span>
                  <span className="text-sm text-primary">
                    {formattedTimeStamp}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-secondary-foreground">
                    {title}
                  </span>
                </div>
                <div className="text-base text-secondary-foreground flex flex-col">
                  {parse(blogData)}
                </div>
              </div>
              <span className="text-xl text-secondary-foreground inline-block py-4">
                Tags:
              </span>
              <div className="flex gap-2 flex-wrap">
                {blogTags?.length >= 1 &&
                  blogTags?.map((currTag, i) => (
                    <CardTags tag={currTag} key={currTag} />
                  ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default memo(DetailBlog);
