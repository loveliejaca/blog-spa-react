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
	const {reduxUserData, userActions, history} = props;
  const {isLoggedIn } = reduxUserData;
	const [showLogin, setShowLogin] = useState(false);

	useEffect(() => {
		function handleLogin() {
			if(setShowLogin) {
				setShowLogin(false);
			}
		}

		handleLogin();
	}, [isLoggedIn]);


	const handleClick = (type) => {
		if(type === 'login') {
			setShowLogin(!showLogin);
		} else {
			history.push('/');
		}
	}
	const handleClickLogout = () => {
		console.log("userActions", userActions);
		userActions.authLogout(false);
		console.log("logout", isLoggedIn);
		setShowLogin(false);
	}

	return (
		<div className="l-header">
			<header className="header">
				<div className="header__logo" onClick={handleClick}>
					<div className="header__logo-img" ></div>
				</div>

				{!isLoggedIn && (
					<div className="btn-auth" onClick={() => handleClick('login')}>
						<span>{ showLogin ? 'Close' : 'Login'}</span>
						</div>
				)}
				{ isLoggedIn && (
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
