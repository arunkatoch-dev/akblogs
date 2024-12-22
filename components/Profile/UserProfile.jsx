"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import CircularSpinner from "../Loaders/CircularSpinner";
import { MdOutlineImageNotSupported } from "react-icons/md";
import useStringTrim from "@/customHooks/UseStringTrim";
import UseGlobalContext from "@/customHooks/UseGlobalContext";
import InfiniteScroll from "react-infinite-scroll-component";
import dynamic from "next/dynamic";
const EditPopup = dynamic(() => import("../Popups/EditPopup"), {
  loading: () => <CircularSpinner />,
});
const DeletePopup = dynamic(() => import("../Popups/DeletePopup"), {
  loading: () => <CircularSpinner />,
});
const imageContainerStyles =
  "w-20 h-20 border border-secondary-foreground rounded-full relative z-10";
const limit = 10;
const UserProfile = ({
  userName,
  emailAddress,
  userId,
  userImg,
  hasImage = false,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [deletePopup, setDeletePopup] = useState({ display: false, _id: null });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const globalContext = UseGlobalContext();
  const { dispatch, globalState } = globalContext;
  const { editDisplay } = globalState;

  const toggleDelete = (display, _id = null) => {
    setDeletePopup((deletePopup) => {
      return { ...deletePopup, display, _id };
    });
  };
  const toggleEdit = (blog) => {
    dispatch({
      type: "TOGGLE_EDIT_DISPLAY",
      display: true,
    });
    dispatch({
      type: "UPDATE_TIP_TAP_DATA",
      useTo: "update",
      blog,
    });
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/userprofile/?page=${page}&limit=${limit}&userId=${userId}`
      );
      const { message, userBlogs } = response.data;
      if (message === "success") {
        setLoading(false);
        if (userBlogs.length === 0) {
          setHasMore(false);
        } else {
          setBlogs((blogs) => {
            const combinedBlogs = [...blogs, ...userBlogs];
            const uniqueBlogs = Array.from(
              new Set(combinedBlogs.map((blog) => blog._id))
            ).map((id) => combinedBlogs.find((blog) => blog._id === id));
            return uniqueBlogs;
          });
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  if (loading) return <CircularSpinner />;
  if (error)
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-2xl text-secondary-foreground animate-bounce">
        Error: {error}
      </div>
    );
  return (
    <>
      <div className="w-full flex flex-col overflow-y-auto">
        <div className="flex px-4 md:px-20 py-5 gap-5 items-center border-b border-b-secondary-foreground ">
          {hasImage ? (
            <div className={imageContainerStyles}>
              <Image
                src={userImg}
                alt="user profile image"
                fill
                priority
                className="object-contain rounded-full"
                sizes={`(max-width: 768px) 80px, 80px `}
              />
            </div>
          ) : (
            <FaUser className="text-secondary-foreground w-20 h-20 border border-secondary-foreground rounded-full p-2" />
          )}

          <div className="flex flex-col items-center gap-1">
            <span className="inline-block text-4xl text-secondary-foreground tracking-wider">
              {userName}
            </span>
            <span className="inline-block text-base text-secondary-foreground">
              {emailAddress}
            </span>
          </div>
        </div>
        <div className="border-b border-b-secondary-foreground flex items-center justify-between px-4 py-2 ">
          <span className="text-secondary-foreground text-lg">
            Your Blog Posts:
          </span>
          <Link
            href="/profile/editprofile"
            className="text-primary hover:text-primary/30 text-lg"
          >
            Edit Profile
          </Link>
        </div>
        <div className="w-full flex flex-col">
          <InfiniteScroll
            dataLength={blogs.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={hasMore}
            loader={<CircularSpinner />}
            endMessage={
              <p className="text-center text-secondary-foreground animate-bounce">
                No more blogs to show
              </p>
            }
          >
            {blogs &&
              blogs?.map((blog) => {
                const { _id, title, blogData, thumbnail, createdAt } = blog;
                const shortTitle = useStringTrim(title, 30);
                const shortDescription = useStringTrim(blogData, 100);
                let timeStamp = useStringTrim(createdAt, 10);
                const formattedTimeStamp = timeStamp
                  .split("-")
                  .reverse()
                  .join("-");
                return (
                  <div
                    key={_id}
                    className="w-full flex flex-col md:flex-row p-4 items-center justify-between my-2 border rounded-lg "
                  >
                    <div className="w-full md:w-[70%] flex flex-col md:flex-row items-center gap-3">
                      {thumbnail === "" ? (
                        <MdOutlineImageNotSupported />
                      ) : (
                        <div className="md:w-28 md:h-28 w-[90vw] h-48 relative">
                          <Image
                            src={thumbnail}
                            alt="blog thumbnail"
                            fill
                            priority
                            className="object-cover"
                            sizes={`(max-width: 768px) 112px, 90vw `}
                          />
                        </div>
                      )}

                      <Link href={`/profile/${_id}`} className="cursor-pointer">
                        <div className="flex flex-col gap-2">
                          <span className="inline-block text-lg text-secondary-foreground">
                            {shortTitle}...
                          </span>
                          <div className="inline-block text-base text-secondary-foreground">
                            {parse(shortDescription)}...
                          </div>
                          <span className="inline-block text-base text-secondary-foreground">
                            {formattedTimeStamp}
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="w-full md:w-[30%] flex items-center justify-end py-2  md:justify-center gap-2">
                      <button
                        className="px-4 py-2 bg-secondary hover:bg-secondary/20  rounded-md"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleEdit(blog);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 bg-destructive hover:bg-destructive/20 rounded-md"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDelete(true, _id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </InfiniteScroll>
        </div>
        {deletePopup.display && (
          <DeletePopup
            toggleDeleteHandler={toggleDelete}
            blogId={deletePopup._id}
          />
        )}
      </div>
      {editDisplay && <EditPopup />}
    </>
  );
};

export default UserProfile;
