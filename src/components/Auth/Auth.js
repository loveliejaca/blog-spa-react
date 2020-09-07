import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";

import AuthLogin from './AuthLogin';
import AuthRegister from './AuthRegister';
import "../../assets/css/auth.css";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import userActions from '../../store/actions/userActions';

function Auth(props) {
  const {reduxUserData} = props;
  const { user } = reduxUserData;

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    function handleLogin() {
      if(user) {
				setIsLogin(false);
			}
    }

		handleLogin();
  }, [user]);

  const handleClick = () => {
    setIsLogin(!isLogin)
  }


  return (
    <div className="auth">
      <div className="auth__inner">
        <h2 className="auth__title">{!isLogin? 'Login' : 'Register'}</h2>

        {!isLogin? <AuthLogin handleClick={handleClick}/> : <AuthRegister handleClick={handleClick}/>}
      </div>
    </div>
  );
}
Auth.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
