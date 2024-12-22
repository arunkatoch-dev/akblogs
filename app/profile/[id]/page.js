import DetailBlog from "@/components/Blogs/DetailBlog";

const Page = async ({ params }) => {
  const blogID = (await params).id;

  return (
    <section className="flex flex-col px-2 py-2 md:px-8 md:py-4">
      <DetailBlog blogID={blogID} />
    </section>
  );
};

export default Page;
