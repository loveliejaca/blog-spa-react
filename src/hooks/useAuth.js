import { useSelector, useDispatch } from "react-redux";

import {
  authRegister,
  authLogin,
  authLogout,
} from "./../redux/modules/auth/authActions";


export const useAuth = () => {
  const dispatch = useDispatch();

  const { currentUser, loginError, registrationError } = useSelector(
    (state) => state.auth
  );

  const _authLogin = (email, password) => {
    return dispatch(
      authLogin({
        email,
        password,
      })
    );
  };

  const _authLogout = () => {
    return dispatch(authLogout());
  };

  const _authRegister = (email, password) => {
    return dispatch(
      authRegister({
        email,
        password,
      })
    );
  };

  return {
    //actions
    _authRegister,
    _authLogin,
    _authLogout,

    //states
    currentUser,
    loginError,
    registrationError,
  };
};

