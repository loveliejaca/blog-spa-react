import React from 'react';
import { withRouter } from "react-router-dom";
import Breadcrumbs from '../components/Breadcrumbs';
import PostDetail from '../components/Post/PostDetail';
import '../assets/css/post.css';

function Post(props) {
  return (
    <main className="l-main">
      <Breadcrumbs/>
      <PostDetail/>
    </main>
  )
}

export default withRouter(Post);
