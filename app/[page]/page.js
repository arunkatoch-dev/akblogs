import AllBlogPosts from "@/components/Blogs/AllBlogPosts";
import BlogsPagination from "@/components/Blogs/Pagination/BlogsPagination";



const Page = async ({ params }) => {
  const currentPage = (await params).page;

  return (
    <>
      <AllBlogPosts currentPage={currentPage} />
      <BlogsPagination />
    </>
  );
};

export default Page;
