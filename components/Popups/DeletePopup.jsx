import axios from "axios";
import React, { useState } from "react";

const DeletePopup = ({ toggleDeleteHandler, blogId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteBlog = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data } = await axios.delete(`/api/?id=${blogId}`);
    if (data.message === "success") {
      alert("Blog deleted successfully.");
      toggleDeleteHandler(false);
      setIsLoading(false);
    }
    if (data.message === "failed") {
      alert("Failed to Delete... Some error occured.");
      toggleDeleteHandler(false);
      setIsLoading(false);
      throw new Error(`Details: ${data.error}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full h-screen fixed top-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-20">
      <div className="w-[95%] md:w-[40%] rounded-lg px-4 py-2 bg-secondary-foreground flex flex-col gap-3  shadow-lg">
        <p className="text-secondary text-lg">Are you sure to delete ?</p>
        <div className="flex items-center justify-end gap-2">
          <button
            className={
              isLoading
                ? "px-4 py-1 bg-green-900 cursor-not-allowed rounded-lg text-white text-lg"
                : "px-4 py-1 bg-green-900 rounded-lg text-white text-lg"
            }
            onClick={deleteBlog}
            disabled={isLoading}
          >
            {isLoading ? "Deletiing..." : "Yes"}
          </button>
          <button
            className="px-4 py-1 bg-red-900 rounded-lg text-white text-lg"
            onClick={(e) => {
              e.preventDefault();
              toggleDeleteHandler(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
