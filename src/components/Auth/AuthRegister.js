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
  const [isMatch, setIsMatch] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const {userActions, reduxUserData, handleClick} = props;
  const { user } = reduxUserData;

  let userList = JSON.parse(localStorage.getItem('users')) || [];

  console.log("userList", userList);

  async function register() {
    let data = await UserApi.registerUser(email, password);

    console.log("register", data);
    userActions.userRegister(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email === '' || password === '') {
      setIsEmpty(true);
      return
    }

    if(password === confirmPass ) {
      let newUser = email
      register();
      setIsMatch(true);
      console.log("crash", user);

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
          <div className={`auth__form-input ${!email && isEmpty && 'is-error'}`}>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="text"
            />
          </div>
          { !email && isEmpty &&
            <span className="auth__form-error"> Email is required </span>
          }
        </div>
        <div className="auth__form-item">
          <label className="auth__lbl">
            password
          </label>
          <div className={`auth__form-input ${!password && isEmpty && 'is-error'}`}>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </div>
          { !password && isEmpty &&
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
          <div className={`auth__form-input ${!confirmPass && isEmpty && 'is-error'}`}>
            <input
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
              type="password"
            />
          </div>
          { !confirmPass && isEmpty &&
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
