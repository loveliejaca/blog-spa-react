import * as types from "./actionTypes";

const Posts = {
  postsReceived: (list) => {
    return { type: types.POST_LIST_REQUEST, data: list };
  },

  postDetailRecieved: (data) => {
    return { type: types.POST_DETAIL, data: data};
  },

  postCommentsRecieved: (data) => {
    return { type: types.POST_COMMENTS, data: data};
  },

  postCreatedRecieved: (data) => {
    return { type: types.POST_CREATE, data: data};
  },

  postUpdatedRecieved: (data) => {
    return { type: types.POST_UPDATE, data: data};
  }

}
export default Posts;
