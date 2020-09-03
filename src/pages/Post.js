import React from 'react';
import { withRouter } from "react-router-dom";

import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import PostDetail from '../components/Post/PostDetail';
import '../assets/css/post.css';

function Post(props) {
  return (
    <Layout>
      <PostDetail/>
    </Layout>
  )
}

export default withRouter(Post);
