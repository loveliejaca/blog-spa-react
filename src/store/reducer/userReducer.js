import * as types from "../actions/actionTypes";

const initialState = {
  user: null
}

const fieldTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return {
        ...state,
        user: action.data,
      };
    case types.USER_REGISTER:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
}

export default fieldTypeReducer;
