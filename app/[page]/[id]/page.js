import AllBlogPosts from "@/components/Blogs/AllBlogPosts";
import DetailBlog from "@/components/Blogs/DetailBlog";
import BlogsPagination from "@/components/Blogs/Pagination/BlogsPagination";

const Page = async ({ params }) => {
  const blogID = (await params).id;

  return (
    <section className="flex flex-col px-2 py-2 md:px-8 md:py-4">
      <DetailBlog blogID={blogID} />
      <span className="py-4 text-2xl text-secondary-foreground inline-block">
        All blog posts
      </span>
      <AllBlogPosts />
      <BlogsPagination />
    </section>
  );
};

export default Page;
