import * as types from "./actionTypes";

const Posts = {
  postsReceived: (list) => {
    return { type: types.POST_LIST_REQUEST, data: list };
  },

  postDetailRecieved: (data) => {
    return { type: types.POST_DETAIL, data: data};
  }
}
export default Posts;
