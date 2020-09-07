import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import '../assets/css/post.css';

// import { useUtils } from "../hooks/useUtils.js";
import { postDate } from "../utils/helpers.js";

import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/Breadcrumbs';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
// API

import PostApi from '../http/api/post';
// settingActions
import postActions from '../store/actions/postActions';
import userActions from '../store/actions/userActions';

function PostFormEdit(props) {

	const {postActions, reduxPostData, history} = props;
  const { postData } = reduxPostData;

	const params = useParams();
	const postId = params.id;

	const [formPost, setFormPost] = useState({
    title: "",
    content: "",
    image: ""
  });

	const [image, setImage] = useState(null);
	const [isTitleEmpty, setIsTitleEmpty] = useState(false);

	async function fetchData() {
		if(!postId) return;
		let result = await PostApi.getPostDetail(postId);
		postActions.postDetailRecieved(result);

		if(postData) {
			setFormPost({
				title: postData.title,
				content: postData.content
			});
			setImage(postData.image);
		}
	}

	useEffect(() => {
    fetchData();
  },[]);


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

	async function updatePost() {
		let data = {
			id: postId,
			title: formPost.title,
			content: formPost.content,
			image: image
		}
    let result = await PostApi.updatePost(data);
    postActions.postCreatedRecieved(result);

		history.push(`/post/${postId}`)

		console.log("updatePost --------", postData, result);
  }

	const handleSubmitPost = (e) => {
    e.preventDefault();
		updatePost()
    console.log("save post");
  };

  const handleCancelPost = (e) => {
    e.preventDefault();
  	setFormPost({
			title: '',
	    content: ''
		})
		setImage('');
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
			<Breadcrumbs currentPage={formPost.title}/>
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
							<time dateTime={postData ? postDate(postData.createdAt) : postDate()} className="post__date">
                {postData ? postDate(postData.createdAt) : postDate()}
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


PostFormEdit.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PostFormEdit);
