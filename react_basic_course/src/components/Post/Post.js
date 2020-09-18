import React from 'react';
import {Link} from "react-router-dom";
import './Post.css';

const Post = (props) => {
  return (<article className="Post">
      <Link to={'/fullPost'} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
          <div className="Author">{props.author}</div>
        </div>
      </Link>
    </article>
  );
}

export default Post;