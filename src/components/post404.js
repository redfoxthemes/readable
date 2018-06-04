import React, {Component} from 'react';

//Post404 class manages redirects when post is not available
class Post404 extends Component
{
  constructor(props){
    super(props);
      this.state={
      showEditPostForm: false,
      showComments: false,
      postId: this.props.postId,
      postTitle: '',
      postBody: ''
    }
  }

    render(){
      return (
      <div>
      <h1> 404 page </h1>
      <h3> OOPS! You may have tried to access a post that does not exist! </h3>
      </div>
      );
    }
}

export default Post404;
