import React, { useState } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { useMutation } from '@apollo/react-hooks';
// API
import UserApi from '../../http/api/user';
// settingActions
import userActions from '../../store/actions/userActions';

function AuthLogin( props ) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isEmpty, setIsEmpty] = useState(false);

  const {userActions, reduxUserData, handleClick} = props;
  const { user } = reduxUserData;

  console.log("crash", localStorage.getItem('currentUser'));

  // let token = JSON.parse(localStorage.getItem('token')) || '';
  let currentUser = JSON.parse(localStorage.getItem('currentUser')) || '';


  async function authenticate() {
    let result = await UserApi.authenticateUser(form.email, form.password);
    userActions.userLogin(result);

    // localStorage.setItem('token', JSON.stringify(result));
    localStorage.setItem('currentUser', JSON.stringify(form));
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

    authenticate();
    setForm({email: '', password: ''})
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
        </div>

        <button className="btn-auth btn-auth--form" type="submit" name="button">
          <span> Login </span>
        </button>
      </form>

      <p className="auth__form-note">No account yet? <span onClick={handleClick}>REGISTER HERE</span></p>
    </div>
  )
}

AuthLogin.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
