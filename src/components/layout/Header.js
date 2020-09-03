import React, {useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import Auth from '../auth/Auth';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// // API
// import UserApi from '../../http/api/user';
// settingActions
import userActions from '../../store/actions/userActions';


function Header( props ) {
	const {reduxUserData, history} = props;
  const { user } = reduxUserData;

	const [showLogin, setShowLogin] = useState(false);
	const [authStatus, setAuthStatus] = useState(false);

	let token = JSON.parse(localStorage.getItem('token')) || '';

	console.log("header --- token", user);

	useEffect(() => {
    function handleLogin() {
			console.log("t------------");
      if(token) {
				setShowLogin(false);
				setAuthStatus(true);
			}
    }

		handleLogin();
  }, [token]);

	const handleClick = (type) => {
		if(type === 'login') {
			setShowLogin(!showLogin);
		} else {
			history.push('/');
		}
	}
	const handleClickLogout = () => {
		console.log("logout");
		setAuthStatus(false);
		window.localStorage.removeItem('token');
	}

	return (
		<div className="l-header">
			<header className="header">
				<div className="header__logo" onClick={handleClick}>
					<div className="header__logo-img" ></div>
				</div>

				{!authStatus && (
					<div className="btn-auth" onClick={() => handleClick('login')}>
						<span>{ showLogin ? 'Close' : 'Login'}</span>
						</div>
				)}
				{ authStatus && (
					<div className="btn-auth" onClick={() => handleClickLogout()}>
						<span>Logout</span>
					</div>
				)}

			</header>

			{showLogin && <Auth/>}
		</div>

	)
}

Header.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
