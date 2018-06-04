import * as api from '../utils/api';

export const FETCH_COMMENTS_COMPLETED = 'FETCH_COMMENTS_COMPLETED';
export const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED';
export const ADD_COMMENT_COMPLETED = 'ADD_COMMENT_COMPLETED';
export const EDIT_COMMENT_COMPLETED = 'EDIT_COMMENT_COMPLETED';
export const DELETE_COMMENT_COMPLETED = 'DELETE_COMMENT_COMPLETED';
export const VOTE_FOR_COMMENT_COMPLETED = 'VOTE_FOR_COMMENT_COMPLETED';


//////////////////////////////////////////////////////////////
//USER OR VIEW ACTIONS - initiated by User

//fetchCommentsByPostID(id) fetches all posts from api and has fetchCommentsCompleted(comments) to provide new comment object array to reducer.
export function fetchCommentsByPostID(id) {
  return  dispatch => {
      api.fetchCommentsByPostID(id).then(hits => {
        setTimeout(() => {
            dispatch(fetchCommentsCompleted(hits.data));
        }, 1000);
      });
    };
}
//addNewComment(id, timestamp, body, author, parentId) makes a call to api to add new comment with given parameters and dispatches addNewCommentCompleted(comment) to provide new comment object to reducer
export function addNewComment(id, timestamp, body, author, parentId) {
  return dispatch => {
    api.addNewComment({id, timestamp, body, author, parentId}).then(response => {
      dispatch(addNewCommentCompleted(response.data));
    });
  }
}
//editComment(id, timestamp, body) makes a call to api to edit a comment with given parameters and dispatches editCommentCompleted(comment) to provide edited comment object to reducer
export function editComment(id, timestamp, body) {
  return dispatch => {
    api.editComment(id, {timestamp, body}).then(response => {
      dispatch(editCommentCompleted(response.data));
    });
  }
}
//deleteComment(id) makes a call to api to set deleted flag for a comment with given id and dispatches deleteCommentCompleted(comment) to provide deleted comment object to reducer
export function deleteComment(id) {
  return dispatch => {
    api.deleteComment(id).then(response => {
      dispatch(deleteCommentCompleted(response.data));
    });
  }
}
//upVoteComment(id) makes a call to api to increment voteScore and dispatches voteForCommentCompleted(comment) to provide edited comment object to reducer
export function upVoteComment(id) {
  let vote = 'upVote';
  return (dispatch) => {
    api.voteForComment(id, {vote}).then(response => {
      dispatch(voteForCommentCompleted(response.data));
    })
  }
}
//downVoteComment(id) makes a call to api to decrement voteScore and dispatches voteForCommentCompleted(comment) to provide edited comment object to reducer
export function downVoteComment(id) {
  let vote = 'downVote';
  return (dispatch) => {
    api.voteForComment(id, {vote}).then(response => {
      dispatch(voteForCommentCompleted(response.data));
    })
  }
}

//////////////////////////////////////////////////////////////
// SERVER ACTIONS - initiated by Server
//////////////////////////////////////////////////////////////

//fetchCommentsCompleted(comments) is an action creator that returns new comments objects array to reducer
export function fetchCommentsCompleted(comments) {
  return {
    type: 'FETCH_COMMENTS_COMPLETED',
    payload: {
      comments,
    },
  };
}
//addNewCommentCompleted(comment) is an action creator that returns new comment object to reducer
function addNewCommentCompleted(comment) {
  return {
      type: 'ADD_COMMENT_COMPLETED',
      payload: {
        comment,
      },
    };
}
//editCommentCompleted(comment) is an action creator that returns new comment object to reducer
function editCommentCompleted(comment) {
  return {
    type: 'EDIT_COMMENT_COMPLETED',
    payload: {
      comment,
    },
  };
}
//deleteCommentCompleted(comment) is an action creator that returns new comment object to reducer
function deleteCommentCompleted(comment) {
  return {
    type: 'DELETE_COMMENT_COMPLETED',
    payload: {
      comment,
    },
  }
}
//voteForCommentCompleted(comment) is an action creator that returns new comment object to reducer
function voteForCommentCompleted(comment) {
  return {
    type: 'VOTE_FOR_COMMENT_COMPLETED',
    payload: {
      comment,
    },
  };
}
