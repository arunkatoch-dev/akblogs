export const defaultState = {
  blogsData: null,
  recentBlogsData: null,
  totalPages: 1,
  currentPage: 1,
  limit: 10,
  tipTapData: {
    useTo: "create",
    blogId: "", //  use to update
    blogTitle: "",
    blogTag: "",
    tags: [],
    thumbnail: { thumbnailImageURL: "", thumbnailImage: null },
    initialContent: "",
    imageId: "",
  },
  editDisplay: false,
};
