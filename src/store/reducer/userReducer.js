import * as types from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isLoggedIn: localStorage.getItem("token") ? true : false
}

const fieldTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_REGISTER:

      return {
        ...state,
        user: action.data,
      };

    case types.AUTH_LOGIN:
      if(action.data) {
        localStorage.setItem("token", JSON.stringify(action.data));
        return {
          ...state,
          token: action.data,
          isLoggedIn: true
        };
      }

      return {
        ...state,
        token: null,
        isLoggedIn: false
      };


    case types.AUTH_LOGOUT:
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('currentUser');

      return {
        ...state,
        token: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
}

export default fieldTypeReducer;
