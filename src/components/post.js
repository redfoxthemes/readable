import React, {Component} from 'react';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaCommentsO from 'react-icons/lib/fa/comments-o';
import { Link } from 'react-router-dom';

//Post class manages individual posts in PostList container, tracking post changes and invoking the parent (PostList) methods to edit and vote on a post.
class Post extends Component
{
  constructor(props){
    super(props);
      this.state={
      postId: this.props.postId,
      postTitle: this.props.post.title || '',
      postBody: this.props.post.body || '',
      showEditPostForm: false
    }
        this.onPostTitleChange = this.onPostTitleChange.bind(this);
        this.onPostBodyChange = this.onPostBodyChange.bind(this);
  }

     //onPostTitleChange() tracks changes to the New Post form 'title' input field
     onPostTitleChange = (e) => {
       e.preventDefault();
       this.setState({postTitle: e.target.value});
     }
     //onPostBodyChange() tracks changes to the New Post form 'body' input field
     onPostBodyChange = (e) => {
       e.preventDefault();
       this.setState({postBody: e.target.value});
     }
     //getDate() helper function formats timestamp
     getDate(timestamp) {
     let date = new Date(timestamp);
     return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
     }
     //showHideEditPost() shows/hides the edit post form
     showHideEditPost = (e) => {
       e.preventDefault();
        this.setState({
          postTitle: this.props.post.title,
          postBody: this.props.post.body,
          showEditPostForm: !this.state.showEditPostForm
        });
      }

    render(){
      const {post} = this.props;
      const {postId, postTitle, postBody, showEditPostForm} = this.state;
      return (
        <div>
          {showEditPostForm &&(
            <div>
            <form onSubmit={(e) => {
                this.props.editPost(e, post.id, postTitle, postBody)
                this.showHideEditPost(e)
              }}>
              <ul className='flex-outer'>
                <li>
                  <label htmlFor='title'>Post Title: </label>
                  <input id='title' onChange={(e) => {this.onPostTitleChange(e)}} value={postTitle} type='text' placeholder='title'/>
                </li>
                <li>
                  <label htmlFor='body'>Post: </label>
                  <input id='body' onChange={(e) => {this.onPostBodyChange(e)}}
                    value={postBody} type='textarea' placeholder='body'/>
                </li>
                <li>
              <button className='iconButton' type='submit'>
              <FaCheckCircleO size={30}/>
              </button>
                </li>
              </ul>
              </form>
              </div>
            )}
          {!showEditPostForm && (
          <ul key={post.id}>
            <li>
            <div className='justify'>
                <h5>Post by {post.author}</h5>
                <h5>Date: {this.getDate(post.timestamp)}</h5>
                <h5>Vote Score: {post.voteScore}</h5>
                <h5>Total Comments: {post.commentCount}</h5>

            </div>
            </li>
              <li className='postheader'>
                <h2>{post.title}</h2>
            </li>
          <li>
          <div className="bottomcontrols">
              <div className='bottomcontrol'> <button className='iconButton' onClick={(e) => this.props.upVotePost(e, post.id)}>
                <FaThumbsOUp size={15}/>
                </button> </div>
              <div className='bottomcontrol'>{post.voteScore>0 && (<h5>{post.voteScore}</h5>)}
              </div>
              <div className='bottomcontrol'><button className='iconButton' onClick={(e) => this.props.downVotePost(e, post.id)}>
                <FaThumbsODown size={15}/>
                </button>
              </div>
              <div className='bottomcontrol'>
                {post.voteScore<0 && (<h5>{Math.abs(post.voteScore)}</h5>)}
              </div>
              <div className='bottomcontrol'>
              <button className='delete'  onClick={(e) => this.showHideEditPost(e, post)}>
                Edit Post
              </button>
              </div>
              <div className='bottomcontrol'>
              <button className='delete' onClick={(e) => this.props.deletePost(e, post.id)}>
                Delete Post
              </button>
              </div>
              <div className='bottomcontrol'>
              <button className='details'  onClick={(e) => {this.props.openPostModal(e, post.category, post.id)}}>
              <Link to={`/${post.category}/${post.id}`}>
              View More Details
              </Link>
              </button>
                </div>
          </div>
          </li>
          </ul>
        )}
      </div>
        )
    }
}

export default Post;
