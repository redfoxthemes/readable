import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PostWithDetails from '../components/postWithDetails';
import {fetchPostById, editPost, upVotePost, downVotePost} from '../actions/postActions';
import Modal from 'react-modal';

//PostModal renders Modal component with individual Post Component and related CommentList. CommentList has methods to edit, upVote, downVote and delete Comments. PostList has methods to edit, upVote and downVote posts.
class PostModal extends Component
{
  constructor(props){
    super(props);
      this.state={
      selectedPostId: this.props.postId || '',
      postModalOpen: this.props.postModalOpen || true,
      selectedPath: '',
      selectedCategory: ''
    }
    this.editPost = this.editPost.bind(this);
    this.upVotePost = this.upVotePost.bind(this);
    this.downVotePost = this.downVotePost.bind(this);
    this.refreshPost = this.refreshPost.bind(this);
    this.closePostModal = this.closePostModal.bind(this);

}
//componentDidMount() dispatches fetchPostById() action creator with 'selectedPostId' as a parameter to fetch the post selected in PostList.  It uses location.pathname to track the location, when typed directly into the address bar
  componentDidMount() {

    if(this.state.selectedPostId==='') {
      let re = new RegExp('.*/(.*?)');
      let path = this.props.location.pathname.replace(re, '');
        if(path && path.length>0){
          this.props.dispatch(fetchPostById(path));
          this.setState({
            selectedPostId: path
          })
          } else {
        this.props.dispatch(fetchPostById(this.state.selectedPostId));;
        }
    }
    if(this.state.selectedCategory==='') {
    let returnExp = new RegExp('.*/');
    let returnPath = this.props.location.pathname.match(returnExp);
    this.setState({
      selectedCategory: returnPath
    })
    }
  }
  //closePostModal() sets postModalOpen local state to 'false'
  closePostModal = () => {
    this.setState({
      postModalOpen: false
    })
  }
  //refreshPost() fetches updated post after edit, upVote, and downVote actions are completed
  refreshPost = (id) => {
      this.props.dispatch(fetchPostById(id));
  }
  //editPost() dispatches editPost() action creator passing new parameters for existing post
  editPost = (e, id, title, body) => {
    e.preventDefault();
    this.props.dispatch(editPost(id, title, body));
    this.refreshPost(id);
  }
  //upVotePost() dispatches upVotePost() action creator with 'upVote' parameter to increment voteScore
  upVotePost = (e, id) => {
    e.preventDefault();
  this.props.dispatch(upVotePost(id));
  this.refreshPost(id);
  }
  //downVoteComment() dispatches downVoteComment() action creator with 'downVote' parameter to decrement voteScore
  downVotePost = (e, id) => {
    e.preventDefault();
  this.props.dispatch(downVotePost(id));
  this.refreshPost(id);
  }
  render(){
    const {postId} = this.props;
    return (
      <div>
      <Modal className='modal'
      overlayClassName='overlay'
      isOpen={this.state.postModalOpen}
      onRequestClose={this.closePostModal}
      contentLabel="View and Edit Post"
      ariaHideApp={false}>

      <div className='bottomcontrols'>
        <div className='bottomcontrol'>
          <button className='goback' title='Back to Home Page' onClick = {() => this.closePostModal()} >
          <Link to={`/${this.state.selectedCategory}`}>
          Back
          </Link>
          </button>

        </div>
        <div className='bottomcontrol'>
          <button className='goback' title='Back to Home Page' onClick = {() => this.closePostModal()} >
          <Link to='/'>
          Home
          </Link>
          </button>
        </div>
      </div>
      <PostWithDetails post={this.props.post} key={this.state.selectedPostId} postId={this.state.selectedPostId} selectedPath={this.state.selectedPath} onEditPost={this.editPost} onDeletePost={this.props.deletePost} onDownVotePost={this.downVotePost} onUpVotePost={this.upVotePost} closePostModal={this.closePostModal} user={this.props.user}/>
      </Modal>
      </div>
    )
}

}
function mapStateToProps (state) {
return {post: state.posts.post};
}
export default withRouter(connect(mapStateToProps)(PostModal));
