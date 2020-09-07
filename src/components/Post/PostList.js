import React, { useEffect } from 'react';
import '../../assets/css/post-list.css';
import { withRouter } from "react-router-dom";
import moment from 'moment'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

// API
import PostApi from '../../http/api/post';

// settingActions
import postActions from '../../store/actions/postActions';
import userActions from '../../store/actions/userActions';



function PostList( props ) {
  const { postActions, reduxPostData, reduxUserData, history } = props;
  const { postList } = reduxPostData;
  const { isLoggedIn } = reduxUserData;

  async function fetchData(offset) {
    let list = await PostApi.getPosts(offset);

    if (offset > 0) {
      let listCopy = _.cloneDeep(postList)
      listCopy = listCopy.concat(list);
      list = listCopy;
    }
    postActions.postsReceived(list);
  }

	useEffect(() => {
    fetchData(0);
  }, [isLoggedIn]);

	const onRouteChange = (postId) => {
    if(postId) {
      history.push(`/post/${postId}`);
    } else {
      history.push(`/create-post`);
    }
	}


  const handleClickMore = () => {
    fetchData(postList.length);
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
        {isLoggedIn && (
          <div className="btn-post btn-post--create" onClick={() => onRouteChange('')}>
  					<span>Create New Post</span>
  				</div>
        )}

			</div>

			<ul className="post__list">
				{list}
			</ul>

			<div className="btn-more" onClick={() => handleClickMore()}>
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
