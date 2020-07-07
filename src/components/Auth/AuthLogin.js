import React, { useState, useEffect } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { useMutation } from '@apollo/react-hooks';
// API
import UserApi from '../../http/api/user';
// settingActions
import userActions from '../../store/actions/userActions';

function AuthLogin( props ) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [input, setInput] = useState({email: '', password: ''});
  const {userActions, reduxUserData, handleClick} = props;
  const { user } = reduxUserData;

  let data = null;

  async function authenticate() {
    let data = await UserApi.authenticateUser(email, password);
    userActions.userLogin(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email === '' || password === '') {
      setIsEmpty(true);
      return
    }

    authenticate();
    setInput({email: '', password: ''})
  }

  return (
    <div className="auth__form">
      <form onSubmit={handleSubmit} >
        <div className="auth__form-item">
          <label className="auth__lbl">
            Email
          </label>
          <div className={`auth__form-input ${!input.email && isEmpty && 'is-error'}`}>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="text"
            />
          </div>

          { !input.email && isEmpty &&
            <span className="auth__form-error"> Email is required </span>
          }
        </div>
        <div className="auth__form-item">
          <label className="auth__lbl">
            password
          </label>
          <div className={`auth__form-input ${!input.password && isEmpty && 'is-error'}`}>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </div>

          { !input.password && isEmpty &&
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
