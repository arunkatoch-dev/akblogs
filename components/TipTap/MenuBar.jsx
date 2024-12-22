"use client";
import {
  FaBold,
  FaItalic,
  FaLink,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaUnderline,
  FaUnlink,
} from "react-icons/fa";
import { MdHorizontalRule } from "react-icons/md";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import CircularSpinner from "../Loaders/CircularSpinner";
import UseGlobalContext from "@/customHooks/UseGlobalContext";
import dynamic from "next/dynamic";
import axios from "axios";
const Headings = dynamic(() => import("./Headings"), {
  loading: () => <CircularSpinner />,
});
const Alignments = dynamic(() => import("./Alignments"), {
  loading: () => <CircularSpinner />,
});

const iconsStyles = "text-lg hover:text-primary";
const publishBtnStyles =
  "bg-primary mt-3 md:mt-0  px-4 py-2 text-lg text-primary-foreground  rounded-md hover:bg-card flex items-center justify-center  gap-3";

const MenuBar = ({ editor, userName, userEmail, userId, useTo = "create" }) => {
  const [isLoading, setIsLoading] = useState({ update: false, publish: false });
  const globalContext = UseGlobalContext();
  const { dispatch, globalState } = globalContext;
  const { blogTitle, tags, thumbnail, blogId, imageId, initialContent } =
    globalState?.tipTapData;
  const router = useRouter();
  const cancelUpdate = () => {
    dispatch({ type: "CLEAR_TIPTAP_DATA" });
    dispatch({ type: "TOGGLE_EDIT_DISPLAY", display: false });
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    // cancelled
    if (url === null) {
      return;
    }
    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const onPublishHandler = async (e) => {
    e.preventDefault();
    setIsLoading((loading) => ({ ...loading, publish: true }));
    let editorData = editor.getHTML();
    if (editorData.length <= 50 || blogTitle.length >= 5000) {
      alert("Either blog title or blog content too short or too long!");
      setIsLoading((loading) => ({ ...loading, publish: false }));
      return;
    } else if (blogTitle.length <= 10 || blogTitle.length >= 100) {
      alert(
        "Either blog title its too short or too long  and blog content too short!"
      );
      setIsLoading((loading) => ({ ...loading, publish: false }));
      return;
    }
    const userTags = tags.toString();
    const thumbnailImgFile = thumbnail.thumbnailImage;
    const formData = new FormData();
    formData.set("userId", userId);
    formData.set("userName", userName);
    formData.set("userEmail", userEmail);
    formData.set("blogTitle", blogTitle);
    formData.set("thumbnailImage", thumbnailImgFile);
    formData.set("blogData", editorData);
    formData.set("tags", userTags);
    const { data } = await axios.post(`/api`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.message === "success") {
      alert("Blog added successfully.");
      dispatch({ type: "CLEAR_TIPTAP_DATA" });
      editor.commands.clearContent();
      router.push("/");
    }
    if (data.message === "failed") {
      alert("Failed to Publish... Some error occured.");
      setIsLoading((loading) => ({ ...loading, publish: false }));
      throw new Error(`Details: ${data.error}`);
    }
    setIsLoading((loading) => ({ ...loading, publish: false }));
  };

  const updateBlog = async (e) => {
    e.preventDefault();

    setIsLoading((loading) => ({ ...loading, update: true }));
    let editorData = editor.getHTML();
    if (editorData.length <= 50) {
      alert(
        "Either blog title or blog too short! Try again after adding more characters"
      );
      setIsLoading((loading) => ({ ...loading, update: false }));
      return;
    } else if (blogTitle.length <= 10) {
      alert(
        "Either blog title or blog too short! Try again after adding more characters"
      );
      setIsLoading((loading) => ({ ...loading, update: false }));
      return;
    }
    if (initialContent === editorData) {
      alert(
        "Nothing to change in editor. Please change content inside editor to update"
      );
      setIsLoading((loading) => ({ ...loading, update: false }));
      return;
    }
    const userTags = tags.toString();
    const thumbnailImgFile = thumbnail.thumbnailImage;
    const thumbnailImageURL = thumbnail.thumbnailImageURL;
    const formData = new FormData();
    formData.set("_id", blogId);
    formData.set("blogTitle", blogTitle);
    formData.set("thumbnailImage", thumbnailImgFile);
    formData.set("thumbnailImageURL", thumbnailImageURL);
    formData.set("cloudinaryImgId", imageId);
    formData.set("blogData", editorData);
    formData.set("tags", userTags);
    const { data } = await axios.patch(`/api`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.message === "success") {
      alert("Blog updated successfully.");
      cancelUpdate();
      editor.commands.clearContent();
      setIsLoading((loading) => ({ ...loading, update: false }));
    }
    if (data.message === "failed") {
      alert("Failed to Publish... Some error occured.");
      setIsLoading((loading) => ({ ...loading, update: false }));
      throw new Error(`Details: ${data.error}`);
    }
    setIsLoading((loading) => ({ ...loading, update: false }));
  };

  return (
    <div className="w-full flex flex-col md:gap-0 md:flex-row  p-4 justify-between bg-secondary">
      <div className="flex flex-wrap items-center gap-5">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold className={iconsStyles} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic className={iconsStyles} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FaStrikethrough className={iconsStyles} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={editor.isActive("subscript") ? "is-active" : ""}
        >
          <FaSubscript className={iconsStyles} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={editor.isActive("superscript") ? "is-active" : ""}
        >
          <FaSuperscript className={iconsStyles} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <FaUnderline className={iconsStyles} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MdHorizontalRule className={iconsStyles} />
        </button>
        <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
          title="Insert Link"
        >
          <FaLink className={iconsStyles} />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          title="remove link"
          disabled={!editor.isActive("link")}
        >
          <FaUnlink
            className={
              !editor.isActive("link")
                ? "text-muted-foreground cursor-not-allowed text-lg"
                : "text-lg hover:text-primary"
            }
          />
        </button>
        <Headings editor={editor} />
        <Alignments editor={editor} />
      </div>
      {useTo === "update" && (
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 px-2">
          <button
            className={
              isLoading.update
                ? `cursor-not-allowed ${publishBtnStyles}`
                : publishBtnStyles
            }
            onClick={updateBlog}
            disabled={isLoading.update}
          >
            {isLoading.update ? "updating..." : "Update Blog"}
          </button>
          <button
            className="bg-destructive mt-3 md:mt-0  px-4 py-2 text-lg text-primary-foreground  rounded-md hover:bg-destructive/20 flex items-center justify-center"
            onClick={cancelUpdate}
          >
            Cancel
          </button>
        </div>
      )}
      {useTo === "create" && (
        <button
          className={
            isLoading.publish
              ? `cursor-not-allowed ${publishBtnStyles}`
              : publishBtnStyles
          }
          onClick={onPublishHandler}
          disabled={isLoading.publish}
        >
          {isLoading.publish ? "Publishing..." : "Publish Blog"}
        </button>
      )}
    </div>
  );
};

export default MenuBar;
