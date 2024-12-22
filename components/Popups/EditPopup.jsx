"use client";
import dynamic from "next/dynamic";
import CircularSpinner from "../Loaders/CircularSpinner";
const TipTap = dynamic(() => import("../TipTap/TipTap"), {
  loading: () => <CircularSpinner />,
});

const EditPopup = () => {
  return (
    <div className="w-full min-h-screen fixed top-0 left-0 backdrop-blur-sm overflow-y-auto bg-white/10 z-20">
      <div className="w-full h-screen">
        <TipTap useTo="update" />
      </div>
    </div>
  );
};

export default EditPopup;
