import UserProfile from "@/components/Profile/UserProfile";
import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const user = await currentUser();
  let firstName = user?.firstName;
  let lastName = user?.lastName || "";
  const userName = `${firstName}  ${lastName}`;
  const userImg = user?.imageUrl;
  const hasImage = user?.hasImage;
  const emailAddress = user?.emailAddresses[0]?.emailAddress;
  const userId = user?.id;

  return (
    <>
      {user ? (
        <section className="w-full min-h-[80vh] p-4">
          <UserProfile
            userName={userName}
            emailAddress={emailAddress}
            userId={userId}
            userImg={userImg}
            hasImage={hasImage}
          />
        </section>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default Page;

export const metadata = {
  title: `User Profile`,
  description: "Ak Blogs User Profile page.",
};
