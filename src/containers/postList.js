import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import uuid from 'uuid-random';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';
import FaClose from 'react-icons/lib/fa/close';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import PostModal from './postModal';
import { fetchPosts, fetchPostsByCategory, addNewPost, deletePost, editPost, upVotePost, downVotePost, fetchPostById, sortByDate, sortByScore, sortByComments } from '../actions/postActions';
import Post from '../components/post';

//PostList displays mapped array of loaded posts, using posts Redux state. It has methods for creating a new post, editing, deleting, upVoting and downVoting posts
class PostList extends Component
{
  constructor(props){
    super(props);
      this.state={
      selectedSort: '',
      selectedPath: '',
      selectedCategory: '',
      showNewPostForm: false,
      showEditComment: false,
      postId: '',
      postTitle: '',
      postBody: '',
      postAuthor: this.props.user,
      postCategory: 'react',
      postModalOpen: false,
      newPostFieldMissing: false
    }
    this.showHideNewPost = this.showHideNewPost.bind(this);
    this.createNewPost = this.createNewPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.upVotePost = this.upVotePost.bind(this);
    this.downVotePost = this.downVotePost.bind(this);
    this.deletePost = this.deletePost.bind(this);

    this.onSelectedSortChange = this.onSelectedSortChange.bind(this);
    this.onPostTitleChange = this.onPostTitleChange.bind(this);
    this.onPostBodyChange = this.onPostBodyChange.bind(this);
    this.onPostCategoryChange = this.onPostCategoryChange.bind(this);
    this.resetNewPostForm = this.resetNewPostForm.bind(this);

    this.openPostModal = this.openPostModal.bind(this);
    this.getDate = this.getDate.bind(this);
}
//componentDidMount() uses location.pathname to track the location, when typed directly into the address bar.
componentDidMount() {
    let path = this.props.location.pathname.replace('/','');

    if(path===''){
        this.props.dispatch(fetchPosts());
          this.setState({selectedPath: '/:postId'
          })} else {
            this.props.dispatch(fetchPostsByCategory(path))
            this.setState({selectedPath: '/:category/:postId'
            })};
}
//onSelectedSortChange() dispatches
onSelectedSortChange = (e) => {
  e.preventDefault();
  switch(e.target.value){
    case 'date':
    this.props.dispatch(sortByDate());
    break;
    case 'score':
    this.props.dispatch(sortByScore());
    break;
    case 'comments':
    this.props.dispatch(sortByComments());
    break;
    default:
    break;
  }
}
//showHideNewPost() toggles the visibility of New Post form
showHideNewPost = (e) => {
  e.preventDefault();
  this.setState({
    showNewPostForm: !this.state.showNewPostForm,
    newPostFieldMissing: false
  });
}
//createNewPost() uses addNewPost() action creator to add a new post
createNewPost = (e) => {
  const {postTitle, postBody, postAuthor, postCategory} = this.state;
  e.preventDefault();
  if (postTitle==='' || postBody==='') {
    this.setState({ newPostFieldMissing: true })} else {
      this.props.dispatch(addNewPost(uuid(), Date.now(), postTitle, postBody, postAuthor, postCategory, 0, false, 0));
      this.showHideNewPost(e);
  }
}
//editPost() dispatches editPost() action creator passing new parameters for existing post
editPost = (e, id, title, body) => {
  e.preventDefault();
  this.props.dispatch(editPost(id, title, body));
}
//upVotePost() dispatches upVotePost() action creator with 'upVote' parameter to increment voteScore
upVotePost = (e, id) => {
  e.preventDefault();
this.props.dispatch(upVotePost(id));
}
//downVoteComment() dispatches downVoteComment() action creator with 'downVote' parameter to decrement voteScore
downVotePost = (e, id) => {
  e.preventDefault();
this.props.dispatch(downVotePost(id));
}
//deletePost() dispatches deletePost() action creator with 'id' parameter to set delete flag on
deletePost = (e, id) => {
  e.preventDefault();
  this.props.dispatch(deletePost(id));
}
//onNewPostTitleChange() tracks changes to the New Post form 'title' input field
onPostTitleChange = (e) => {
  e.preventDefault();
  this.setState({postTitle: e.target.value});
}
//onNewPostBodyChange() tracks changes to the New Post form 'body' input field
onPostBodyChange = (e) => {
  e.preventDefault();
  this.setState({postBody: e.target.value});
}
//onNewPostCategoryChange() tracks changes to the New Post form 'category' selected value
onPostCategoryChange = (e) => {
  e.preventDefault();
  this.setState({postCategory: e.target.value});
}
//resetNewPostForm() resets local states to the initial value to clear the bound New Post form fields in Modal
resetNewPostForm(e) {
  e.preventDefault();
  this.setState({
    postTitle: '',
    postBody: '',
    postCategory: ''
  })
}
//openPostModal() sets postModalOpen local state to 'true' to allow PostModal render
openPostModal = (e, selectedCategory, selectedPostId) => {
e.preventDefault();
this.props.dispatch(fetchPostById(selectedPostId));
this.setState({
postId: selectedPostId,
selectedCategory: selectedCategory,
postModalOpen: true
  })
}

//getDate() helper function formats timestamp
getDate(timestamp) {
let date = new Date(timestamp);
return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
}

  render(){
    const {posts, categories, selectedCategory} = this.props;
    const { postTitle, postBody, postCategory, selectedPath, postId, showEditPostForm} = this.state;
    return (
      <div>
          <div className='newPostForm'>
            <hr/>
              <div className="postListHeader">
             <h3> Posts >> <strong>{selectedCategory}</strong> </h3>
             </div>
             <div className='postListMenu'>
               <div>
             {!this.state.showNewPostForm &&
              <button className='addnew' title='Add New Post' onClick = {(e) => this.showHideNewPost(e)} >
                <h3 > Add New Post </h3>
              </button>
              }
              </div>
              <div className='floatright'>
              <label htmlFor='sort'>Sort by: </label>
              <select id='sort' className='selectfield' onChange={(e) => this.onSelectedSortChange(e)}>
              <option key='none' value=''></option>
              <option key='date' value='date'>date</option>
              <option key='score' value='score'>score</option>
              <option key='comments' value='comments'>comments</option>
              </select>
              </div>
            </div>
            {this.state.showNewPostForm && (
              <div className='addnew'>
                <div className='justify'>
                  <h3> Add New Post: </h3>
                  <button className='iconButton' title='Close Add New post' onClick={this.showHideNewPost} >
                  <FaClose size={25}/>
                  </button>
                </div>
              {this.state.newPostFieldMissing && (
              <div className='errormessage'>
                <h3>You must have something in both Title and Post fields to save your new post!</h3>
              </div>
              )}
            <form className='addnewpostform' onSubmit={(e) =>{
                this.createNewPost(e)
                this.resetNewPostForm(e)
              }}>
              <ul className='flex-outer'>
                <li>
              <label htmlFor='title'>Post Title: </label>
              <input id='title' className='inputfield' onChange={this.onPostTitleChange}
              value={postTitle} type='text' placeholder='Go ahead, give it a title'/>
            </li>
            <li>
              <label htmlFor='body'>Post: </label>
              <input id='body' className='inputfield' onChange={this.onPostBodyChange}
                    value={postBody} type='text' placeholder='Type away ... '/>
            </li>
            <li>
            <label htmlFor='select'>Pick Topic: </label>
            <select id='select' className='selectfield' value={postCategory} onChange={this.onPostCategoryChange}>
            {categories && categories.map(category => (
            <option key={category.name} value={category.name}>{category.name}</option>
            ))}
            </select>
            </li>
            <li>
              <button className='iconButton' type='submit' title='Submit your post'>
              <FaCheckCircleO size={30}/>
              </button>
            </li>
            </ul>
            </form>
            </div>
          )}
        </div>

        <div>
          {posts && posts.map((post) => (
            <div className='post'>
                <Post  key={post.id} post={post} upVotePost={this.upVotePost} downVotePost={this.downVotePost} editPost={this.editPost} deletePost={this.deletePost} openPostModal={this.openPostModal}/>
            </div>
            ))}
        </div>

            <div className="postModal">
              <Route path={selectedPath} render={({history}) => (

                  <PostModal key={this.state.postId} selectedCategory={this.props.selectedCategory} postModalOpen={this.state.postModalOpen} postId={this.state.postId} editPost={this.editPost} deletePost={this.deletePost} downVotePost={this.downVotePost} upVotePost={this.upVotePost}  user={this.props.user}/>
              )}/>
            </div>
          </div>

    )
  }
}

function mapStateToProps (state) {
  return {posts: state.posts.posts,
  isLoading: state.posts.posts};
}
export default withRouter(connect(mapStateToProps)(PostList));
