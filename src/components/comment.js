import React, {Component} from 'react';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';
import FaMinusCircle from 'react-icons/lib/fa/minus-circle';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

//Comment class manages individual posts in PostModal container, tracking comment changes and invoking the parent (CommentList) methods to edit and vote on a comment
class Comment extends Component
{
  constructor(props){
    super(props);
 const {comment} = this.props;
      this.state={
      showEditCommentForm: false,
      commentId: comment.id,
      commentParentId: comment.parentId,
      commentBody: comment.body || '',
      commentAuthor: this.props.user
    }

        this.showHideEditComment = this.showHideEditComment.bind(this);
        this.onCommentBodyChange = this.onCommentBodyChange.bind(this);
  }
  //showHideEditComment() shows/hides the edit comment form
    showHideEditComment = (e) => {
      e.preventDefault();
       this.setState({
         showEditCommentForm: !this.state.showEditCommentForm
       });
     }

     //onCommentBodyChange() tracks changes to the New Comment form 'body' input field
     onCommentBodyChange = (e) => {
       e.preventDefault();
       this.setState({commentBody: e.target.value});
     }

    render(){
      const {commentId, commentBody, commentAuthor, showEditCommentForm} = this.state;
      const {comment} = this.props;
      return (
          <div className='comment'>
              <div className='author'> Comment by {commentAuthor}</div>
                <div className='floatright'>
                  <div className='spaced'>
                  <button className='iconButton' onClick={(e) => this.showHideEditComment(e)}>
                  <FaPencil size={15}/>
                  </button>
                  </div>
                  <div className='spaced'>
                  <button className='iconButton' onClick={(e) => this.props.onDeleteComment(e, commentId)}>
                    <FaMinusCircle size={20}/>
                  </button>
                  </div>
                </div>

              {!showEditCommentForm && (
                <div>
                <div className='postdescription'>{commentBody}</div>

                  <div className='bottomcontrols'>
                    <div className='bottomcontrol'>
                    <button className='iconButton' onClick={(e) => this.props.onUpVoteComment(e, commentId)}>
                    <FaThumbsOUp size={15} />
                    </button>
                    </div>
                    <div className='bottomcontrol'>
                    {comment.voteScore>0 && (
                    <div className='vote'>{comment.voteScore}</div>
                    )}
                    </div>
                    <div className='bottomcontrol'>
                    <button className='iconButton' onClick={(e) => this.props.onDownVoteComment(e, commentId)}>
                    <FaThumbsODown size={15}/>
                    </button>
                    </div>
                    <div className='bottomcontrol'>
                    {comment.voteScore<0 && (
                    <div className='vote'>{Math.abs(comment.voteScore)}</div>
                    )}
                    </div>
                  </div>
                </div>
              )}

            {showEditCommentForm && (
              <div>
              <form className='form' onSubmit={(e) => {
                  this.props.onEditComment(e, commentId, commentBody)
                  this.showHideEditComment(e)
                }}>
                <ul className='flex-outer'>
                  <li>
              <label htmlFor='body'>Comment: </label>
              <input id='body' className='inputField' onChange={(e) => this.onCommentBodyChange(e)} value={commentBody} type='text' placeholder='body'/>
              </li>
              <li>
                <button className='iconButton' type='submit'  >
                <FaCheckCircleO size={30}/>
                </button>
                </li>
              </ul>
                </form>
                </div>
              )}
          </div>
      );
    }
}
export default Comment;
