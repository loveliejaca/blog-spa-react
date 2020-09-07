import React, {useState} from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { useMutation } from '@apollo/react-hooks';
// API
import UserApi from '../../http/api/user';
// settingActions
import userActions from '../../store/actions/userActions';

function AuthRegister( props ) {
  const [form, setForm] = useState({
    email: "",
    confirmPassword: "",
    password: "",
  });

  const [isMatch, setIsMatch] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const {userActions, handleClick} = props;

  let userList = JSON.parse(localStorage.getItem('users')) || [];


  async function register() {
    let result = await UserApi.registerUser(form.email, form.password);

    userActions.userRegister(result);
  }

  const handleChange = (e) => {
    e.persist();
    const { id, value } = e.target;

    setForm((prevState) => {
      return { ...prevState, [id]: value.trim() };
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(form.email === '' || form.password === '') {
      setIsEmpty(true);
      return
    }

    if(form.password === form.confirmPassword ) {
      let newUser = form.email
      register();
      setIsMatch(true);

      userList.push(newUser);
      localStorage.setItem('users', JSON.stringify(userList));
    } else {
      setIsMatch(false)
    }

  }

  return (
    <div className="auth__form">
      <form onSubmit={handleSubmit} >
        <div className="auth__form-item">
          <label className="auth__lbl">
            Email
          </label>
          <div className={`auth__form-input ${!form.email && isEmpty && 'is-error'}`}>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              type="text"
            />
          </div>
          { !form.email && isEmpty &&
            <span className="auth__form-error"> Email is required </span>
          }
        </div>
        <div className="auth__form-item">
          <label className="auth__lbl">
            password
          </label>
          <div className={`auth__form-input ${!form.password && isEmpty && 'is-error'}`}>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          { !form.password && isEmpty &&
            <span className="auth__form-error"> Password is required </span>
          }
          { !isMatch &&
            <span className="auth__form-error"> Password do not match! </span>
          }
        </div>

        <div className="auth__form-item">
          <label className="auth__lbl">
            Confirm password
          </label>
          <div className={`auth__form-input ${!form.confirmPassword && isEmpty && 'is-error'}`}>
            <input
              type="password"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          { !form.confirmPassword && isEmpty &&
            <span className="auth__form-error"> Password is required </span>
          }
          { !isMatch &&
            <span className="auth__form-error"> Password do not match! </span>
          }
        </div>

        <button className="btn-auth btn-auth--form" type="submit" name="button">
          <span> Register </span>
        </button>
      </form>

      <p className="auth__form-note">Already have an account? <span onClick={handleClick}>LOGIN HERE</span></p>
    </div>
  )
}

AuthRegister.propTypes = {
  userActions: PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    reduxUserData: state.reduxUserData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRegister);
