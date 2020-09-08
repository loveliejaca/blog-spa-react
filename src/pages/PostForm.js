import React, { useState } from "react";
import '../assets/css/post.css';

// import { useUtils } from "../hooks/useUtils.js";
import { postDate } from "../utils/helpers.js";

import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Modal from '../components/Modal';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
// API

import PostApi from '../http/api/post';
// settingActions
import postActions from '../store/actions/postActions';
import userActions from '../store/actions/userActions';

function PostForm(props) {

	const {postActions, history} = props;
	// const { _scrollLock } = useUtils();
	const [image, setImage] = useState(null);

	const formActionPage = "Create New Post";

	const [isTitleEmpty, setIsTitleEmpty] = useState(false);
	const [isShowModal, setIsShowModal] = useState(false);
	const [formPost, setFormPost] = useState({
    title: "",
    content: ""
  });


	const handleShowErrorTite = isTitleEmpty ? (
    <p className="error-txt">Title must not be empty.</p>
  ) : (
    ""
  );

	const handleUpdateField = (e) => {
		e.persist();
		const { id, value } = e.target;

		setFormPost((prevState) => {
			return {
				...prevState,
				[e.target.id]: e.target.value,
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

	async function createPost() {
		let data = {
			title: formPost.title,
			content: formPost.content,
			image: image
		}
    let result = await PostApi.createPost(data);
    postActions.postCreatedRecieved(result);

		history.push('/');
  }

	const handleSubmitPost = (e) => {
    e.preventDefault();
		const {title, content } = formPost;

		if (title && !isTitleEmpty) {
			createPost()
		} else {
			setIsTitleEmpty(true);
		}
  };

  const handleCancelPost = (e) => {
    e.preventDefault();

		setIsShowModal(true);
  };

	const handleModalClose = () => {
    setIsShowModal(false);
  };

	const handleModalOk = () => {
    setIsShowModal(false);
    history.push("/");
		setFormPost({
			title: "",
	    content: "",
	    image: ""
		})
  };

	const ImgUpload = ({ onChange, src, }) => {
    return (
			<label htmlFor="photo-upload" className="post__upload">
					UPLOAD IMAGE
				<input id="photo-upload" type="file"  onChange={onChange} style={{"display": "none"}}/>
			</label>
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
			<Modal
				onShow={isShowModal}
        onClose={handleModalClose}
        onOk={handleModalOk}
			/>
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

							<div className={`post__title ${isTitleEmpty && 'is-error'}`}>
								<textarea
									id="title"
									className="post-form-title-textarea"
									placeholder="Title"
									onChange={handleUpdateField}
									value={formPost.title}
								/>
							{handleShowErrorTite}
							</div>


							<div className="post__featured">
								<div className="post__featured-img" style={{ backgroundImage: `url(${image})` }}></div>
								<ImgUpload onChange={(e)=> photoUpload(e)} />
							</div>

							<div className="post__body is-comment-disable">
								<textarea
	                id="content"
	                placeholder="Content"
	                className="post-form-content-textarea"
	                onChange={handleUpdateField}
	                value={formPost.content}
	              />
							</div>
						</div>
					</form>
				</div>

			</div>
		</Layout>
	)
}


PostForm.propTypes = {
	postActions: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
		reduxPostData: state.reduxPostData,
    reduxUserData: state.reduxUserData
  };
}

function mapDispatchToProps(dispatch) {
  return {
		postActions: bindActionCreators(postActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
