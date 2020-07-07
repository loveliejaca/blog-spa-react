import React, {useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import Auth from './Auth/Auth';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// API
import UserApi from './../http/api/user';
// settingActions
import userActions from './../store/actions/userActions';


function Header( props ) {
	const {userActions, reduxUserData, history} = props;
  const { user } = reduxUserData;
	const [showLogin, setShowLogin] = useState(false);
	const [authStatus, setAuthStatus] = useState(false);


	useEffect(() => {
    function handleLogin() {
      if(user) {
				setShowLogin(false);
				setAuthStatus(true);
			}
    }

		handleLogin();
  }, [user]);

	const handleClick = (type) => {
		if(type === 'login') {
			setShowLogin(!showLogin);
		} else {
			history.push('/');
		}
	}

	return (
		<div className="l-header">
			<header className="header">
				<div className="header__logo" onClick={handleClick}>
					<div className="header__logo-img" ></div>
				</div>

				{!authStatus
					? ( <div className="btn-auth" onClick={() => handleClick('login')}>
						<span>{ showLogin ? 'Close' : 'Login'}</span>
						</div>)
					: (<div className="btn-auth">
						<span>Logout</span>
						</div>)
				}

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
