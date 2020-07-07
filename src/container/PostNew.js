import React from 'react';
import { withRouter } from "react-router-dom";
import '../assets/css/post.css';
import Breadcrumbs from '../components/Breadcrumbs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// API
import UserApi from './../http/api/user';
// settingActions
import userActions from './../store/actions/userActions';

function PostNew(props) {
	const {userActions, reduxUserData} = props;
  const { user } = reduxUserData;

	console.log("user", user);
	return (
		<main className="l-main">
			<Breadcrumbs/>
			<div className="subpage l-container">
				<div className="post post--form">
					<form className="post__form">
						<div className="post__btn">
							<div className="btn-post btn-post--save">
								<span>Save Post</span>
							</div>
							<div className="btn-post btn-post--cancel">
								<span>Cancel</span>
							</div>
						</div>

						<div className="post__date">2019.06.19</div>

						<div className="post__title">
							<textarea name="comment" placeholder="Title">

							</textarea>
						</div>

						<div className="post__featured">
							<div className="post__featured-img"></div>
							<div className="post__upload">
								<input className="post__upload-input" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
								<label htmlFor="file"><strong>UPLOAD IMAGE</strong></label>
							</div>

						</div>

						<div className="post__body">
							<textarea name="comment" placeholder="Content">

							</textarea>
						</div>
					</form>
				</div>

			</div>
		</main>
	)
}


PostNew.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PostNew);
