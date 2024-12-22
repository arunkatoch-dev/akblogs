import AllBlogPosts from "@/components/Blogs/AllBlogPosts";
import BlogsPagination from "@/components/Blogs/Pagination/BlogsPagination";
import RecentBlogs from "@/components/Blogs/RecentBlogs";
import MainHeading from "@/components/Heading/MainHeading";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col overflow-x-hidden m-0 p-0 box-border 2xl:px-28">
      <MainHeading />
      <RecentBlogs />
      <section className="w-full px-8 py-7 flex flex-col">
        <span className="py-8 text-2xl text-secondary-foreground inline-block">
          All blog posts
        </span>
        <AllBlogPosts />
        <BlogsPagination />
      </section>
    </main>
  );
}

export const metadata = {
  title: "AK Blogs",
  description:
    "Arun Katoch blogs next js based application. This is a blog application where you can read blogs and write blogs. This is a full stack application with next js, mongodb, and tailwind css.",
  generator: "Next.js",
  applicationName: "AK Blogs",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Ak Blogs",
    "Blogs",
    "Arun Katoch",
    "Tailwind CSS",
    "MongoDB",
  ],
  creator: 'Arun Katoch',
  publisher: 'Arun Katoch',
};
