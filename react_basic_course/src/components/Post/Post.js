import React from 'react';
import {Link, withRouter} from "react-router-dom";
import './Post.css';

const Post = (props) => {
  return (<article className="Post">
      <Link to={`${props.match.url}/${props.id}`}>
        <h1>{props.title}</h1>
        <div className="Info">
          <div className="Author">{props.author}</div>
        </div>
      </Link>
    </article>
  );
}

export default withRouter(Post);