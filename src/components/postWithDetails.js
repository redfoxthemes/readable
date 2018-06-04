import React, {Component} from 'react';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaCommentsO from 'react-icons/lib/fa/comments-o';
import CommentList from '../containers/commentList';
import { Link } from 'react-router-dom';
import Post404 from '../components/post404';
//Post class manages individual posts in PostModal container, tracking post changes and invoking the parent (PostList) methods to edit and vote on a post. It calls CommentList to show and edit comments for the selected post
class PostWithDetails extends Component
{
  constructor(props){
    super(props);
      this.state={
      showEditPostForm: false,
      selectedPath: this.props.selectedPath,
      postId: this.props.postId,
      postTitle: '',
      postBody: ''
    }
        this.showHideEditPost = this.showHideEditPost.bind(this);
        this.onPostTitleChange = this.onPostTitleChange.bind(this);
        this.onPostBodyChange = this.onPostBodyChange.bind(this);
    
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

    render(){
      const {post} = this.props;
      const {postId, postTitle, postBody, showEditPostForm, selectedPath} = this.state;
      return (
      <div className='post'>
        {post.id &&(
        <div>
        <div className='topcontrols'>
          <div className='topcontrol'>
          <div className='author'> Post by {post.author}</div>
          </div>
          <div className='topcontrol'>
          <button className='addnew' onClick={(e) => this.showHideEditPost(e)}>Edit Post</button>
          </div>
          <div className='topcontrol'>
              <button className='delete' onClick={(e) => {
                this.props.onDeletePost(e, post.id)
                this.props.closePostModal()}}>
              <Link to={`${selectedPath}`}>
                Delete Post
              </Link>
              </button>
          </div>
        </div>

            {!showEditPostForm && (
            <div>
            <div className='postheader'>{post.title}</div>
              <div className='postdescription'>{post.body}</div>
              <div className="bottomcontrols">
                  <div className='bottomcontrol'> <button className='iconButton' onClick={(e) => this.props.onUpVotePost(e, postId)}>
                    <FaThumbsOUp size={15}/>
                    </button> </div>
                  <div className='bottomcontrol'>{post.voteScore>0 && (<h5>{post.voteScore}</h5>)}
                  </div>
                  <div className='bottomcontrol'><button className='iconButton' onClick={(e) => this.props.onDownVotePost(e, postId)}>
                    <FaThumbsODown size={15}/>
                    </button>
                  </div>
                  <div className='bottomcontrol'>
                    {post.voteScore<0 && (<h5>{Math.abs(post.voteScore)}</h5>)}
                  </div>
                    <div className='bottomcontrol'>
                    </div>
                  <div className='bottomcontrol'>
                    <h5>There are {post.commentCount} comments</h5>
                  </div>
              </div>

            </div>
            )}

            {showEditPostForm && (
              <div>
              <form onSubmit={(e) => {
                  this.props.onEditPost(e, postId, postTitle, postBody)
                  this.showHideEditPost(e)
                }}>
                <ul className='flex-outer'>
                  <li>
                <label htmlFor='title'>Post Title: </label>
                <input id='title' onChange={(e) => {this.onPostTitleChange(e)}}
                value={postTitle} type='text' placeholder='title'/>
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
              <div className='comments'>
                  <CommentList postId={this.props.post.id} user={this.props.user}/>
              </div>
                </div>
          )}

          <div>
          {!post.id &&(
            <Post404/>
          )}
          </div>
        </div>
      );
    }
}

export default PostWithDetails;
