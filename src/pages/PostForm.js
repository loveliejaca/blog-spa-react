import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import '../assets/css/post.css';

// import { useUtils } from "../hooks/useUtils.js";
import { postDate } from "../utils/helpers.js";

import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/Breadcrumbs';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
// API
import UserApi from '../http/api/user';
// settingActions
import userActions from './../store/actions/userActions';

function PostNew(props) {
	const { history} = props;
	// const { _scrollLock } = useUtils();
	const [image, setImage] = useState(null);

	const [formPost, setFormPost] = useState({
    title: "",
    published: false,
    body: "",
    userId: null,
  });

	const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

	const formActionPage = "Create New Post";

	const handleShowErrorTite = isTitleEmpty ? (
    <p className="post-form-title-error">Title must not be empty.</p>
  ) : (
    ""
  );

	const handleUpdateField = (e) => {
		e.persist();
		const { id, value } = e.target;

		setFormPost((prevState) => {
			return {
				...prevState,
				[e.target.id]:
					e.target.id === "published" ? e.target.checked : e.target.value,
			};
		});

		switch (id) {
			case "title":
				if (value) {
					setIsTitleEmpty(false);
				} else {
					setIsTitleEmpty(true);
				}
				break;
			default:
				break;
		}
	};

	const handleSubmitPost = (e) => {
    e.preventDefault();
    console.log("save post");
  };

  const handleCancelPost = (e) => {
    e.preventDefault();
    setIsShowModal(true);
    // _scrollLock(true);
  };

  const handleModalClose = () => {
    // _scrollLock(false);
    setIsShowModal(false);
  };

  const handleModalOk = () => {
    // _scrollLock(false);
    setIsShowModal(false);
    history.push("/");
  };


  const fileInput = useRef(null)

  const handleClick = () => {
    fileInput.current.click();
  }

	const ImgUpload = ({ onChange, src, }) => {
    return (
			<div className="post__upload">
				<label for="image-upload" className="post-form-image-label" onClick={() => handleClick()}>
	          UPLOAD IMAGE
	        <input id="post__upload-input" type="file" ref={fileInput}  onChange={onChange} style={{"display": "none"}}/>
	      </label>
			</div>
    );
  }

	const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImage(reader.result);
    }

    reader.readAsDataURL(file);
  }

	return (
		<Layout>
			<Breadcrumbs currentPage={formActionPage}/>
			<div className="subpage l-container">
				<div className="post post--form">
					<form className="post__form" onSubmit={handleSubmitPost}>
						<div className="post__btn">
							<button
								type="submit"
								className="btn-post btn-post--save"
							>
								<span>Save Post</span>
							</button>
							<button onClick={handleCancelPost} className="btn-post btn-post--cancel">
								<span>Cancel</span>
							</button>
						</div>

						<div className="post__body-container">
							<time dateTime={postDate()} className="post__date">
                {postDate()}
              </time>

							<div className="post__title">
								<textarea
									id="title"
									className="post-form-title-textarea"
									placeholder="Title"
									onChange={handleUpdateField}
									value={formPost.title}
								/>
							</div>

							{handleShowErrorTite}

							<div className="post__featured">
								<div className="post__featured-img" style={{ backgroundImage: `url(${image})` }}></div>
								<ImgUpload onChange={(e)=> photoUpload(e)} />
							</div>

							<div className="post__body">
								<textarea
	                id="body"
	                placeholder="Content"
	                className="post-form-content-textarea"
	                onChange={handleUpdateField}
	                value={formPost.body}
	              />
							</div>
						</div>
					</form>
				</div>

			</div>
		</Layout>
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
