import React from 'react';
import Layout from '../components/layout/Layout';
import Slider from '../components/Slider';
import PostList from '../components/Post/PostList';

function Home(props) {
  return (
    <Layout>
      <Slider/>
      <div className="l-container">
        <PostList/>
      </div>
    </Layout>
  );
}

export default Home;
