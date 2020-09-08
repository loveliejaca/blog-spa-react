import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";
import moment from 'moment'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { postDate } from "../../utils/helpers.js";

import Breadcrumbs from '../Breadcrumbs';
import Comment from './Comment';
import '../../assets/css/post.css';

import _ from 'lodash';


// API
import PostApi from '../../http/api/post';

// settingActions
import postActions from '../../store/actions/postActions';
import userActions from '../../store/actions/userActions';

function PostDetail( props ) {
  const {history} = props;
  const postId = props.match.params.id;
  const {postActions, reduxPostData, reduxUserData} = props;
  const {isLoggedIn } = reduxUserData;
  const { postData } = reduxPostData;

  async function fetchData() {
    let result = await PostApi.getPostDetail(postId);
    postActions.postDetailRecieved(result);
  }

  async function addComment(comment) {
    await PostApi.addComment(postId, comment);
    return true;
  }

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);


  const handleClick = () => {
    history.push(`/post/${postId}/edit`);
	}

  const handleSubmitComment = async (comment) => {
    let temp = _.cloneDeep(postData);
    await addComment(comment);


    temp.comments.unshift({content: comment, createAt: moment().format() })
    postActions.postDetailRecieved(temp);
	}


  if(postData === null) return null;

  return (
    <React.Fragment>
      <Breadcrumbs
        currentPage={postData.title}
      />
      <div className="subpage l-container">
        <div className="post">
          <div className="post__btn">
            {isLoggedIn &&
              <div className="btn-post btn-post--edit" onClick={handleClick}>
                <span>Edit Post</span>
              </div>
            }
          </div>

          <time
            dateTime={postDate(postData.createdAt)}
            className="post__date"
          >
            {postDate(postData.createdAt)}
          </time>

          <div className="post__title">
            <h2>{postData.title}</h2>
          </div>

          <div className="post__featured">
            <div className={`post__featured-img ${postData.image? '': 'is-noimage'}`} style={{  backgroundImage: `url(${postData.image? postData.image: require("../../assets/images/no-image.png")})`}}></div>
          </div>

          <div className="post__body">
            {postData.content}
          </div>
        </div>

        <Comment commentList={postData.comments} handleSubmitComment={handleSubmitComment}/>
      </div>
    </React.Fragment>
  )
}

PostDetail.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));


// export default withRouter(PostDetail);
