import * as types from "../actions/actionTypes";

const initialState = {
  postList: [],
  postData: null,
  postComments: null,
}

const fieldTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_LIST_REQUEST:
      return {
        ...state,
        postList: action.data,
      };
    case types.POST_DETAIL:
      return {
        ...state,
        postData: action.data,
      };
    case types.POST_COMMENTS:
      return {
        ...state,
        postComments: action.data,
      };
    default:
      return state;
  }
}

export default fieldTypeReducer;
