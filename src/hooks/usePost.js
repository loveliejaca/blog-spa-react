import { useSelector, useDispatch } from "react-redux";

import {
  getPost,
  getPosts,
} from "./../redux/modules/post/postActions";


export const usePost = () => {

  const dispatch = useDispatch();

  const { posts, post } = useSelector(
    (state) => state.post
  );

  const _getPosts = () => {
    return dispatch(getPosts());
  };

  const _getPost = (data ) => {
    return dispatch(getPost( data ));
  };


  return {
    //action
    _getPosts,
    _getPost,

    //states
    post,
    posts
  };

};
