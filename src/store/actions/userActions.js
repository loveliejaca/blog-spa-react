import * as types from "./actionTypes";

const User = {
  userRegister: (data) => {
    return { type: types.USER_REGISTER, data: data};
  },

  authLogin: (data) => {
    return { type: types.AUTH_LOGIN, data: data };
  },

  authLogout: (status) => {
    console.log("authLogout", status);
    return { type: types.AUTH_LOGOUT , status};
  },
}
export default User;
