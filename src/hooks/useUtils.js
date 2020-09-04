import { useSelector, useDispatch } from "react-redux";
import {
  loginRegistrationForm,
  loginForm,
  scrollLock,
} from "./../redux/modules/utils/utilsActions";

export const useUtils = () => {
  const dispatch = useDispatch();
  const { isLoginRegistrationForm, isLoginForm, isScrollLock } = useSelector(
    (state) => state.utils
  );

  const _loginRegistrationForm = (data) => {
    return dispatch(loginRegistrationForm(data));
  };

  const _scrollLock = (data) => {
    return dispatch(scrollLock(data));
  };

  const _loginForm = (data) => {
    return dispatch(loginForm(data));
  };

  return {
    // actions
    _loginRegistrationForm,
    _loginForm,
    _scrollLock,

    // states
    isLoginRegistrationForm,
    isLoginForm,
    isScrollLock,
  };
};
