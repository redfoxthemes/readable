import * as api from '../utils/api';

export const FETCH_POSTS_STARTED = 'FETCH_POSTS_STARTED';
export const FETCH_POSTS_COMPLETED = 'FETCH_POSTS_COMPLETED';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const FETCH_POSTS_BY_CATEGORY_COMPLETED = 'FETCH_POSTS_BY_CATEGORY_COMPLETED';
export const ADD_POST_COMPLETED = 'ADD_POST_COMPLETED';
export const EDIT_POST_COMPLETED = 'EDIT_POST_COMPLETED';
export const DELETE_POST_COMPLETED = 'DELETE_POST_COMPLETED';
export const VOTE_FOR_POST_COMPLETED = 'VOTE_FOR_POST_COMPLETED';
export const FETCH_POST_COMPLETED = 'FETCH_POST_COMPLETED';
export const SORT_POSTS_BY_DATE = 'SORT_POSTS_BY_DATE';
export const SORT_POSTS_BY_SCORE = 'SORT_POSTS_BY_SCORE';
export const SORT_POSTS_BY_COMMENTS = 'SORT_POSTS_BY_COMMENTS';

//////////////////////////////////////////////////////////////
//USER OR VIEW ACTIONS - initiated by User

//fetchPosts() fetches all posts from api and has fetchPostsCompleted(posts) to provide new post object array to reducer.
export function fetchPosts() {
  return dispatch => {
    dispatch(fetchPostsStarted());
      api.fetchPosts().then(hits => {
        setTimeout(() => {
            dispatch(fetchPostsCompleted(hits.data));
        }, 1000);
      });
    };
}
//fetchPostById(id) fetches details for selected post and has fetchPostCompleted(post) to provide new post object to reducer.
export function fetchPostById(id) {
  return dispatch => {
      api.fetchPost(id).then(response => {
        dispatch(fetchPostCompleted(response.data));
      });
    };
}
//fetchPostsByCategory(category) fetches all posts under selected category and has fetchPostsCompleted(posts) to provide new post object to reducer.
export function fetchPostsByCategory(category){
  return  dispatch => {
      api.fetchPostsByCategory(category).then(hits => {
        setTimeout(() => {
            dispatch(fetchPostsCompleted(hits.data));
        }, 1000);
      });
    };
}
//addNewPost(id, timestamp, title, body, author, category, voteScore, deleted, commentCount) makes a call to api to add new post with given parameters and dispatches addNewPostCompleted(post) to provide new post object to reducer
export function addNewPost(id, timestamp, title, body, author, category, voteScore, deleted, commentCount) {
  return dispatch => {
    api.addNewPost({id, timestamp, title, body, author, category, voteScore, deleted, commentCount}).then(response => {
      dispatch(addNewPostCompleted(response.data));
    });
  }
}
//editPost(id, title, body) makes a call to api to edit a post with given parameters and dispatches editPostCompleted(post) to provide edited post object to reducer
export function editPost(id, title, body) {
  return dispatch => {
    api.editPost(id, {title, body}).then(response => {
      dispatch(editPostCompleted(response.data));
    });
  }
}
//deletePost(id) makes a call to api to set deleted flag for a post with given id and dispatches deletePostCompleted(post) to provide deleted post object to reducer
export function deletePost(id) {
  return dispatch => {
    api.deletePost(id).then(response => {
      dispatch(deletePostCompleted(response.data));
    });
  }
}
//upVotePost(id) makes a call to api to increment voteScore and dispatches voteForPostCompleted(post) to provide edited post object to reducer
export function upVotePost(id) {
  const vote = 'upVote';
  return (dispatch) => {
    api.voteForPost(id, {vote}).then(response => {
      dispatch(voteForPostCompleted(response.data));
    })
  }
}
//downVotePost(id) makes a call to api to decrement voteScore and dispatches voteForPostCompleted(post) to provide edited post object to reducer
export function downVotePost(id) {
  let vote = 'downVote';
  return (dispatch) => {
    api.voteForPost(id, {vote}).then(response => {
      dispatch(voteForPostCompleted(response.data));
    })
  }
}
export function sortByDate() {
  return (dispatch) => {
    dispatch(sortByDateCompleted());
  }
}

export function sortByScore() {
  return (dispatch) => {
    dispatch(sortByScoreCompleted());
  }
}

export function sortByComments(){
  return (dispatch) => {
  dispatch(sortByCommentsCompleted());
  }
}

//////////////////////////////////////////////////////////////
// SERVER ACTIONS - initiated by Server
//////////////////////////////////////////////////////////////

function sortByDateCompleted() {
  return {
    type: SORT_POSTS_BY_DATE,
  };
}

function sortByScoreCompleted() {
  return {
    type: SORT_POSTS_BY_SCORE,
  };
}

function sortByCommentsCompleted() {
  return {
    type: SORT_POSTS_BY_COMMENTS,
  };
}

function fetchPostsStarted() {
  return {
    type: 'FETCH_POSTS_STARTED',
  };
}

//fetchPostsCompleted(posts) is an action creator that returns new posts objects array to reducer
function fetchPostsCompleted(posts) {
  return {
    type: 'FETCH_POSTS_COMPLETED',
    payload: {
      posts,
    },
  };
}
//fetchPostCompleted(post) is an action creator that returns new post object to reducer
function fetchPostCompleted(post) {
  return {
    type: 'FETCH_POST_COMPLETED',
    payload: {
      post,
    },
  };
}
//fetchPostsByCategoryCompleted(posts) is an action creator that returns new posts object array to reducer
export function fetchPostsByCategoryCompleted(posts) {
  return {
    type: 'FETCH_POSTS_BY_CATEGORY_COMPLETED',
    payload: {
      posts,
    },
  };
}
//addNewPostCompleted(post) is an action creator that returns new post object to reducer
function addNewPostCompleted(post) {
  return {
      type: 'ADD_POST_COMPLETED',
      payload: {
        post,
      },
    };
}
//deletePostCompleted(post) is an action creator that returns new post object to reducer
function deletePostCompleted(post) {
  return {
    type: 'DELETE_POST_COMPLETED',
    payload: {
      post,
    },
  }
}
//editPostCompleted(post) is an action creator that returns new post object to reducer
function editPostCompleted(post) {
  return {
    type: 'EDIT_POST_COMPLETED',
    payload: {
      post,
    },
  };
}
//voteForPostCompleted(post) is an action creator that returns new post object to reducer
function voteForPostCompleted(post) {
  return {
    type: 'VOTE_FOR_POST_COMPLETED',
    payload: {
      post
    }
  }
}
