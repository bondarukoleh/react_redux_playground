import React from 'react';
import {Link, withRouter} from "react-router-dom";
import './Post.css';

const Post = (props) => {
  return (<article className="Post">
      {/*<Link to={`/${props.id}`}>*/}
        <h1 onClick={() => props.history.push(`/${props.id}`)}>{props.title}</h1>
        <div className="Info">
          <div className="Author">{props.author}</div>
        </div>
      {/*</Link>*/}
    </article>
  );
}

export default withRouter(Post);