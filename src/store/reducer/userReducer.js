import * as types from "../actions/actionTypes";

const initialState = {
  currentUser: localStorage.getItem("currentUser") || { authenticate: "" },
  user: null
}

const fieldTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      if(action.data.authenticate !== ""){
        localStorage.setItem("currentUser", JSON.stringify(action.data));

        console.log("data", action.data);
        return {
          ...state,
          currentUser: JSON.stringify(action.data)
        };
      }
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
