import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import moment from 'moment'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Comment from './Comment';
import '../../assets/css/post.css';

// API
import PostApi from '../../http/api/post';

// settingActions
import postActions from '../../store/actions/postActions';

function PostDetail( props ) {
  const [editStatus, setEditStatus] = useState(null);
  const postId = props.match.params.postId;
  const {postActions, reduxPostData} = props;
  const { postData } = reduxPostData;

  useEffect(() => {
    async function fetchData() {
      let data = await PostApi.getPostDetail(postId);
      postActions.postDetailRecieved(data);
    }
    fetchData();
  },[postActions, postId]);


  const handleClick = () => {
    setEditStatus(!editStatus)
	}

  console.log("postData", postData);

  if(postData === null) return null;

  return (
    <div className="subpage l-container">
      <div className="post">
        <div className="post__btn">

          {editStatus && (
            <div className="btn-post btn-post--save">
              <span>Save Post</span>
            </div> )}

            <div className="btn-post btn-post--edit" onClick={handleClick}>
              <span>{editStatus? 'Cancel': 'Edit Post'}</span>
            </div>

        </div>

        <time className="post__date">
          {moment(postData.createdAt).format('YYYY.MM.DD')}
        </time>

        <div className="post__title">
          {!editStatus && (
            <h2>{postData.title}</h2>
          )}

          {editStatus && (
            <textarea name="comment" placeholder="Title" defaultValue={postData.title}/>
          )}
        </div>

        <div className="post__featured">
          <div className={`post__featured-img ${postData.image? '': 'is-noimage'}`} style={{  backgroundImage: `url(${postData.image? postData.image: require("../../assets/images/no-image.png")})`}}></div>

          {editStatus && (
            <div className="post__upload">
              <input className="post__upload-input" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
              <label htmlFor="file"><strong>UPLOAD IMAGE</strong></label>
            </div>
          )}

        </div>

        <div className="post__body">

          {!editStatus && (
            postData.content
          )}

          {editStatus && (
            <textarea name="content" placeholder="Content" defaultValue={postData.content}/>
          )}

        </div>
      </div>

      <Comment commentList={postData.comments}/>
    </div>
  )
}

PostDetail.propTypes = {
  postActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    reduxPostData: state.reduxPostData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(postActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));


// export default withRouter(PostDetail);
