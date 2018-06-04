import React, {Component} from 'react';
import { connect } from 'react-redux';
import Comment from '../components/comment';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o';
import {addNewComment, editComment, deleteComment, upVoteComment, downVoteComment, fetchCommentsByPostID} from '../actions/commentActions';
import { fetchPostById } from '../actions/postActions';
import uuid from 'uuid-random';

//CommentList loads individual Comment Components from a mapped array of loaded comments, using Redux comments state. It has methods for creating a new comment, editing, deleting, upVoting and downVoting comments
class CommentList extends Component
{
  constructor(props){
    super(props);
      this.state={
      showNewCommentForm: false,
      showEditCommentForm: false,
      commentAuthor: this.props.user,
      commentBody: '',
      newCommentFieldMissing: false
    }
    this.showHideNewComment = this.showHideNewComment.bind(this);
    this.onCommentBodyChange = this.onCommentBodyChange.bind(this);
    this.resetNewCommentForm = this.resetNewCommentForm.bind(this);
    this.refreshPost = this.refreshPost.bind(this);
}
//componentDidMount() dispatches user action in commentActions.js, which fetches comments by post id and returns comments
componentDidMount() {
    this.props.dispatch(fetchCommentsByPostID(this.props.postId));
}
//refreshPost() fetches updated post after comments are added or deleted
refreshPost = () => {
    this.props.dispatch(fetchPostById(this.props.postId));
}
//showHideNewComment()   shows/hides the new comment form
showHideNewComment = (e) => {
  e.preventDefault();
  this.setState({
    showNewCommentForm: !this.state.showNewCommentForm,
    newCommentFieldMissing: false
  });
}
//createNewComment() validates user entry in comment body field and dispatches addNewComment() action creator
createNewComment = (e) => {
  e.preventDefault();
  if (this.state.commentBody==='') {
    this.setState({ newCommentFieldMissing: true })} else {
        this.props.dispatch(addNewComment(uuid(), Date.now(), this.state.commentBody, this.state.commentAuthor, this.props.postId ));
      this.refreshPost();
  }
}
//editComment() dispatches editComment() action creator passing new parameters for existing comment
editComment = (e, commentId, commentBody) => {
  e.preventDefault();
  this.props.dispatch(editComment(commentId, Date.now(), commentBody));
}
//deleteComment() dispatches deleteComment() action creator with 'id' parameter to set delete flag on
deleteComment = (e, id) => {
    e.preventDefault();
  this.props.dispatch(deleteComment(id));
  this.refreshPost();
}
//upVoteComment() dispatches upVoteComment() action creator with 'upVote' parameter to increment voteScore
upVoteComment = (e, id) => {
    e.preventDefault();
this.props.dispatch(upVoteComment(id));
}
//downVoteComment() dispatches downVoteComment() action creator with 'downVote' parameter to decrement voteScore
downVoteComment = (e, id) => {
    e.preventDefault();
this.props.dispatch(downVoteComment(id));
}
//onCommentBodyChange() tracks changes to the New Comment form 'body' input field
onCommentBodyChange = (e) => {
  this.setState({commentBody: e.target.value});
}
//resetNewCommentForm() resets local states to the initial value to clear the bound New Post form fields in Modal
resetNewCommentForm(e) {
  e.preventDefault();
  this.setState({
    commentBody: ''
  })
}

render(){
const {comments} = this.props;
const {commentBody, commentAuthor} = this.state;
    return (
      <div className="comments">
        <hr/>
          <button className='addnew' title='Add New Comment' onClick = {(e) => this.showHideNewComment(e)}>
           <h3> Add New Comment </h3>
          </button>
        {this.state.showNewCommentForm &&
          <div>
          <div className='newcomment'>
              <div className='justify'>
           <h3> Add New Comment: </h3>
             <button className='iconButton' title='Close Add New Comment' onClick={this.showHideNewComment} >
             <FaTimesCircleO size={25}/>
             </button>
             </div>

             {this.state.newCommentFieldMissing && (
             <div className='errormessage'>
               <h3>You must have something in both Title and Post fields to save your new post!</h3>
             </div>
             )}
             <form className='addnewcommentform' onSubmit={(e) =>{
                 this.createNewComment(e)
                 this.resetNewCommentForm(e)
               }}>
               <input className='inputfield' onChange = {(e) => this.onCommentBodyChange(e)}
                  value={commentBody} type='text' placeholder='body'/>
                <button className='iconButton' type='submit'>
                  <FaCheckCircleO size={30}/>
                </button>
            </form>
            </div>
        </div>
          }

          {comments && comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onEditComment={this.editComment} onDeleteComment={this.deleteComment} onDownVoteComment={this.downVoteComment} onUpVoteComment={this.upVoteComment} user={commentAuthor}/>
          ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {comments: state.comments.comments,
        commentsLoading: state.comments
      };
  }


export default connect(  mapStateToProps)(CommentList);
