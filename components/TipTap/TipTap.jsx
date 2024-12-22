"use client";
import React, { memo } from "react";
import { MdClose } from "react-icons/md";
import dynamic from "next/dynamic";
import { EditorContent } from "@tiptap/react";
import Image from "next/image";
import UseTipTapEditor from "@/customHooks/UseTipTapEditor";
import UseGlobalContext from "@/customHooks/UseGlobalContext";
import CircularSpinner from "../Loaders/CircularSpinner";
const DragAndDropImage = dynamic(() => import("./DragAndDropImage"), {
  loading: () => <CircularSpinner />,
});
const MenuBar = dynamic(() => import("./MenuBar"));
const addTagBtnStyles =
  "bg-primary  px-4 py-2 text-lg text-primary-foreground rounded-md hover:bg-secondary flex items-center justify-center";
const TipTap = ({
  userName = "",
  userEmail = "",
  userId = "",
  useTo = "create",
}) => {
  const globalContext = UseGlobalContext();
  const { dispatch, globalState } = globalContext;
  const { blogTitle, blogTag, tags, thumbnail, initialContent } =
    globalState?.tipTapData;
  const editor = UseTipTapEditor(initialContent);
  const onChangeEventHandler = (name, value) => {
    dispatch({
      type: "ONCHANGE_EVENT_HANDLER",
      name,
      value,
    });
  };

  const addTagsHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TAGS",
    });
  };

  const removeTagHandler = (currTag) => {
    dispatch({
      type: "REMOVE_TAGS",
      currTag,
    });
  };

  const addThumbnailImage = (thumbNailImgURL, file) => {
    dispatch({ type: "ADD_IMAGE", thumbNailImgURL, file });
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full min-h-[100vh] border bg-background border-secondary-foreground relative">
      <MenuBar
        editor={editor}
        userName={userName}
        userEmail={userEmail}
        userId={userId}
        useTo={useTo}
      />
      <div className="w-full flex items-center justify-center flex-col p-4">
        <DragAndDropImage addThumbnailImage={addThumbnailImage} />
      </div>
      {thumbnail.thumbnailImageURL && (
        <div className="w-full flex items-center justify-center py-4">
          <Image
            src={thumbnail.thumbnailImageURL}
            width={800}
            height={500}
            alt="thumbnail image"
          />
        </div>
      )}

      <div className="w-full flex-col">
        <input
          type="text"
          value={blogTitle}
          onChange={(e) => {
            e.preventDefault();
            onChangeEventHandler("blogTitle", e.target.value);
          }}
          placeholder="Add your blog title here..."
          className="w-full p-4 bg-transparent border-b border-b-secondary-foreground text-xl"
        />
      </div>
      <div className="flex items-center py-4 px-4">
        <span className="text-lg text-secondary-foreground">
          Write your blog below:
        </span>
      </div>
      <EditorContent
        editor={editor}
        className="editor min-h-[50vh] bg-background border border-secondary-foreground p-4 [&>*:first-child]:w-full [&>*:first-child]:min-h-[50vh] [&>*:first-child]:p-4"
      />
      <div className="w-full flex flex-col gap-5">
        <div className="flex items-center border-t p-4">
          <input
            type="text"
            value={blogTag}
            onChange={(e) => {
              e.preventDefault();
              onChangeEventHandler("blogTag", e.target.value);
            }}
            placeholder="Add tags here..."
            className="w-full bg-transparent text-lg py-4 px-2 outline-none border-b"
          />
          <button className={addTagBtnStyles} onClick={addTagsHandler}>
            Add
          </button>
        </div>
        <div className="w-full flex flex-wrap p-5 gap-3">
          {tags &&
            tags?.map((currTag, i) => {
              return (
                <div
                  key={i}
                  className="px-2 py-2 flex items-center gap-5 justify-between bg-accent-foreground text-primary rounded-lg"
                >
                  <span>{currTag}</span>
                  <MdClose
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      removeTagHandler(currTag);
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default memo(TipTap);
