import React, {useState, useEffect} from 'react';
import './FullPost.css';
import axios from 'axios';

const FullPost = ({match}) => {
  const [contentState, setContent] = useState({postData: null});
  useEffect(() => getPostData(), [match.params.id]);

  const getPostData = () => {
    axios.get(`/posts/${match.params.id}`)
      .then((result) => setContent({postData: result.data}));
  };

  const deletePost = () => {
    axios.delete(`/posts/${match.params.id}`)
      .then((result) => console.log(result));
  };

  console.log('From Full post');
  console.log(match.params.id);
  let post = <p style={{textAlign: "center"}}>Couldn't get this Post!</p>;
  if (match.params.id) {
    post = <p style={{textAlign: "center"}}>Loading...</p>;
  }
  if (contentState.postData) {
    post = (
      <div className="FullPost">
        <h1>{contentState.postData.title}</h1>
        <p>{contentState.postData.body}</p>
        <div className="Edit">
          <button onClick={deletePost} className="Delete">Delete</button>
        </div>
      </div>
    );
  }
  return post;
};

export default FullPost;