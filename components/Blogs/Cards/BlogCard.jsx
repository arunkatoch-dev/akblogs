"use client";
import { useEffect, useRef, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import parse from "html-react-parser";
import CardTags from "./CardTags";
import useStringTrim from "@/customHooks/UseStringTrim";
import useArrayTrim from "@/customHooks/UseArrayTrim";
import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import UseGlobalContext from "@/customHooks/UseGlobalContext";
let cardStyles = {
  container: "flex-col",
  imageContainer: "w-full h-[228px]",
};

const BlogCard = ({ post, style = "horizontal" }) => {
  // console.log("Blog Card Rendered rendered");
  const globalContext = UseGlobalContext();
  const { currentPage } = globalContext.globalState;
  const myElementRef = useRef(null);
  const [innerWidth, setInnerWidth] = useState(0);
  const { _id, author, title, blogData, thumbnail, tags, createdAt } = post;
  let shortTitle = useStringTrim(title, 30);
  let shortDescription = useStringTrim(blogData, 100);
  let timeStamp = useStringTrim(createdAt, 10);
  const formattedTimeStamp = timeStamp.split("-").reverse().join("-");
  let minTags = useArrayTrim(tags, 3);
  if (style === "horizontal") {
    cardStyles = {
      ...cardStyles,
      container: "w-full flex-col shadow-lg",
      imageContainer: "w-full h-[228px]",
    };
    shortTitle = useStringTrim(title, 30);
    shortDescription = useStringTrim(blogData, 100);
    minTags = useArrayTrim(tags, 5);
  }
  if (style === "vertical") {
    cardStyles = {
      ...cardStyles,
      container: "w-full flex-row",
      imageContainer: "w-[320px] h-[200px]",
    };
    shortTitle = useStringTrim(title, 30);
    shortDescription = useStringTrim(blogData, 100);
    minTags = useArrayTrim(tags, 3);
  }
  if (style === "largeVertical") {
    cardStyles = {
      ...cardStyles,
      container: "w-full flex-row",
      imageContainer: "w-[592px] h-[246px]",
    };
    shortTitle = useStringTrim(title, 100);
    shortDescription = useStringTrim(blogData, 200);
    minTags = useArrayTrim(tags, 10);
  }

  useEffect(() => {
    if (myElementRef.current) {
      const { width } = myElementRef.current.getBoundingClientRect();
      setInnerWidth(width);
    }
  }, []);

  return (
    <div className={`flex gap-6 py-7 ${cardStyles.container}`}>
      <div
        className={`${cardStyles.imageContainer} relative`}
        ref={myElementRef}
      >
        {thumbnail !== "" && (
          <Image
            src={thumbnail}
            alt="blog thumbnail"
            fill
            priority
            className="object-cover"
            sizes={`${innerWidth}px`}
          />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between py-2 px-2">
          <span className="text-sm text-primary">{author}</span>
          <span className="text-sm text-primary">{formattedTimeStamp}</span>
        </div>

        <Link href={`/${currentPage}/${_id}`} className="cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-2xl text-secondary-foreground">
              {shortTitle}
            </span>
            <MdOutlineArrowOutward className="text-2xl text-secondary-foreground" />
          </div>
        </Link>
        <div className="text-base text-secondary-foreground flex flex-col">
          {parse(shortDescription)}
          ...
        </div>

        <div className="flex gap-2 flex-wrap">
          {minTags?.length >= 1 &&
            minTags?.map((currTag, i) => (
              <CardTags tag={currTag} key={currTag + i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default memo(BlogCard);
