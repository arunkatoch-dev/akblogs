export const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_BLOGS_DATA":
      return {
        ...state,
        blogsData: action.blogs,
        totalPages: parseInt(action.pagination.totalPages), // { page, totalBlogs, totalPages } ===>>>> pagination object
        currentPage: parseInt(action.currentPage), 
      };
    case "SET_RECENT_BLOGS_DATA":
      return {
        ...state,
        recentBlogsData: action.blogsData,
      };
    case "ONCHANGE_EVENT_HANDLER": {
      return {
        ...state,
        tipTapData: { ...state.tipTapData, [action.name]: action.value },
      };
    }
    case "ADD_TAGS": {
      if (state.tipTapData.blogTag.length < 3) {
        alert("Oops! empty tag found and maybe your tag length is too short!");
        return {
          ...state,
          tipTapData: {
            ...state.tipTapData,
          },
        };
      }
      if (state.tipTapData.tags.length >= 12) {
        alert("maximum 12 tags are allowed.");
        return {
          ...state,
          tipTapData: { ...state.tipTapData, blogTag: "" },
        };
      }
      let newTag = state.tipTapData.blogTag.toString().trim();
      if (state.tipTapData.tags.includes(newTag)) {
        alert("element already exist");
        return {
          ...state,
          tipTapData: {
            ...state.tipTapData,
            blogTag: "",
          },
        };
      }
      return {
        ...state,
        tipTapData: {
          ...state.tipTapData,
          tags: [...state.tipTapData.tags, newTag],
          blogTag: "",
        },
      };
    }
    case "REMOVE_TAGS":
      const updatedTags = state.tipTapData.tags.filter(
        (tag) => action.currTag !== tag
      );
      return {
        ...state,
        tipTapData: {
          ...state.tipTapData,
          tags: updatedTags,
        },
      };
    case "ADD_IMAGE":
      return {
        ...state,
        tipTapData: {
          ...state.tipTapData,
          thumbnail: {
            ...state.tipTapData.thumbnail,
            thumbnailImageURL: action.thumbNailImgURL,
            thumbnailImage: action.file,
          },
        },
      };
    case "CLEAR_TIPTAP_DATA":
      return {
        ...state,
        tipTapData: {
          useTo: "create",
          blogTitle: "",
          blogTag: "",
          tags: [],
          thumbnail: { thumbnailImageURL: "", thumbnailImage: null },
          initialContent: "",
          imageId: "",
        },
      };

    case "TOGGLE_EDIT_DISPLAY":
      return {
        ...state,
        editDisplay: action.display,
      };

    case "UPDATE_TIP_TAP_DATA":
      const { _id, title, blogData, thumbnail, tags, cloudinaryImgId } =
        action.blog;
      let tagsToArray = tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
      return {
        ...state,
        tipTapData: {
          ...state.tipTapData,
          useTo: action.useTo,
          blogId: _id,
          blogTitle: title,
          tags: tagsToArray,
          thumbnail: {
            ...state.tipTapData.thumbnail,
            thumbnailImageURL: thumbnail,
          },
          initialContent: blogData,
          imageId: cloudinaryImgId,
        },
      };

    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.page,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
