import * as types from "./actionTypes";

const User = {
  userLogin: (data) => {
    return { type: types.USER_LOGIN, data: data };
  },

  userRegister: (data) => {
    return { type: types.USER_REGISTER, data: data};
  }
}
export default User;
