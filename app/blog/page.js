import Tiptap from "@/components/TipTap/TipTap";
import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();
  let firstName = user?.firstName;
  let lastName = user?.lastName || "";
  const userName = firstName + lastName;
  const emailAddress = user?.emailAddresses[0]?.emailAddress;
  const userId = user?.id;
  return (
    <>
      {user ? (
        <section className="w-full px-5 py-2 flex flex-col overflow-y-auto">
          <Tiptap
            userName={userName}
            userEmail={emailAddress}
            userId={userId}
            useTo="create"
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
  title: "Add New Blog",
  description:
    "Add new Blogs to Arun Katoch Blogs. This is a blog application where you can read and write blogs. This is a full stack application with next js, mongodb, and tailwind css.",
};
