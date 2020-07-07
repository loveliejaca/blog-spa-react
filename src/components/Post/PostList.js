import React, { useEffect } from 'react';
import '../../assets/css/post-list.css';
import { withRouter } from "react-router-dom";
import moment from 'moment'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// API
import PostApi from '../../http/api/post';
import UserApi from '../../http/api/user';

// settingActions
import postActions from '../../store/actions/postActions';
import userActions from '../../store/actions/userActions';

function PostList( props ) {

  const { postActions, reduxPostData, userActions, reduxUserData, history } = props;
  const { postList } = reduxPostData;
  const { user } = reduxUserData;

  console.log("user", user);

	useEffect(() => {
    async function fetchData() {
			let list = await PostApi.getPosts();
	    postActions.postsReceived(list);
    }
    fetchData();
  }, [postActions]);

	const onRouteChange = (postId) => {
    if(postId) {
      history.push(`/post/${postId}`);
    } else {
      history.push(`/create-new-post`);
    }
	}

	if (!postList.length) return null;

	let list = postList.map((item, index) => (
		<li className="post__item" key={item.id}>
			<article className="post__article">
				<div className="post__article-link" onClick={() => onRouteChange(item.id)}>
					<div className="post__article-thumb" style={{  backgroundImage: `url(${item.image? item.image: require("../../assets/images/no-image.png")})`}}>
					</div>

					<time className="post__article-date">
						{moment(item.createdAt).format('YYYY.MM.DD')}
					</time>

					<h3 className="post__article-title">
						{item.title}
					</h3>
				</div>
			</article>
		</li>
	))

	return (
		<div className="post">
			<div className="post__head">
				<h2 className="post__head-title">NEWS</h2>
        {user && (
          <div className="btn-post btn-post--create" onClick={() => onRouteChange('')}>
  					<span>Create New Post</span>
  				</div>
        )}

			</div>

			<ul className="post__list">
				{list}
			</ul>

			<div className="btn-more">
				<span>Load More</span>
			</div>
		</div>
	)
}

// export default withRouter(PostList);
PostList.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
