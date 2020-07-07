import React from 'react';
import Slider from '../components/Slider';
import PostList from '../components/Post/PostList';

function Home(props) {
  return (
    <main className="l-main">
      <Slider/>
      <div className="l-container">
        <PostList/>
      </div>
    </main>
  );
}

export default Home;
