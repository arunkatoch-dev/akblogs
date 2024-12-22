"use client";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

const EditProfile = () => {
  return (
    <section className="w-full flex items-center justify-center">
      <UserProfile path="/profile/editprofile" />
    </section>
  );
};

export default EditProfile;
