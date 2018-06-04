import { combineReducers} from  'redux';
import sortBy from 'sort-by';
import {
FETCH_POSTS_STARTED,
FETCH_POST_COMPLETED,
FETCH_POSTS_COMPLETED,
FETCH_POSTS_BY_CATEGORY_COMPLETED,
ADD_POST_COMPLETED,
EDIT_POST_COMPLETED,
DELETE_POST_COMPLETED,
VOTE_FOR_POST_COMPLETED,
SORT_POSTS_BY_DATE,
SORT_POSTS_BY_SCORE,
SORT_POSTS_BY_COMMENTS,
} from '../actions/postActions';
import {
  FETCH_CATEGORIES_COMPLETED,
} from '../actions/categoryActions';
import {
  FETCH_COMMENTS_COMPLETED,
  ADD_COMMENT_COMPLETED,
  EDIT_COMMENT_COMPLETED,
  DELETE_COMMENT_COMPLETED,
  VOTE_FOR_COMMENT_COMPLETED,
} from '../actions/commentActions';


////////////////////////////////////////////
//POSTS Reducer///////
////////////////////////////////////////////
const initialPostsState = {
  posts: [],
  isLoading: false,
  post: []
}

function posts(state = initialPostsState, action) {
  switch(action.type){
    case SORT_POSTS_BY_DATE:
    {
    const unsortedPosts = state.posts.slice();
    const sortedPosts = unsortedPosts.sort(sortBy('-timestamp'));
    return {
      ...state,
      posts: sortedPosts,
    };
    }
    case SORT_POSTS_BY_SCORE:
    {
    const unsortedPosts = state.posts.slice();
    const sortedPosts = unsortedPosts.sort(sortBy('-voteScore'));
    return {
      ...state,
      posts: sortedPosts,
    };
    }
    case SORT_POSTS_BY_COMMENTS:
    {
    const unsortedPosts = state.posts.slice();
    const sortedPosts = unsortedPosts.sort(sortBy('-commentCount'));
    return {
      ...state,
      posts: sortedPosts,
    };
    }
    case FETCH_POSTS_STARTED:
    return {
      ...state,
      isLoading: true,
    };
    case FETCH_POST_COMPLETED:
    return {
      ...state,
      post: action.payload.post,
    };
    case FETCH_POSTS_COMPLETED:
    return {
      ...state,
      isLoading: false,
      posts: action.payload.posts,
    };
    case FETCH_POSTS_BY_CATEGORY_COMPLETED:
    return {
      posts: action.payload.posts,
    };
    case ADD_POST_COMPLETED:
    const post = Object.assign({}, action.payload.post);
    return {
      posts: state.posts.concat(post),
    };
    case EDIT_POST_COMPLETED:
    {
    const editedPosts = state.posts.map(post => {
      if(post.id === action.payload.post.id) {
      return action.payload.post;
    }
      return post;
    });
    return {
      ...state,
      posts: editedPosts
    }
    }
    case DELETE_POST_COMPLETED:
    return {
      posts: state.posts.filter(post => post.id !== action.payload.post.id)
    };
    case VOTE_FOR_POST_COMPLETED:
    {
    const editedPosts = state.posts.map(post => {
      if(post.id === action.payload.post.id) {
      return action.payload.post;
      }
      return post;
    });
    return {
      ...state,
      posts: editedPosts
    }
    }
  default:
  {
  return state;
  }
  }
}

////////////////////////////////////////////
//CATEGORIES Reducer///////
////////////////////////////////////////////
const initialCategoriesState = {
  categories: []
}

function categories(state = initialCategoriesState, action) {
  switch(action.type) {
    case FETCH_CATEGORIES_COMPLETED:
    return {
      categories: action.payload.categories,
    };
    default:
    {
    return state;
    }
  }
}

////////////////////////////////////////////
//COMMENTS Reducer///////
////////////////////////////////////////////
const initialCommentsState = {
  comments: []
}

function comments(state = initialCommentsState, action) {
  switch(action.type) {

    case FETCH_COMMENTS_COMPLETED:
    return {
      ...state,
      comments: action.payload.comments,
      commentsLoading: false,
    };
    case ADD_COMMENT_COMPLETED:
    const comment = Object.assign({}, action.payload.comment);
    return {
      comments: state.comments.concat(comment)
    }
    case EDIT_COMMENT_COMPLETED:
    {
    const editedComments = state.comments.map(comment => {
      if(comment.id === action.payload.comment.id) {
      return action.payload.comment;
      }
      return comment;
    });
    return {
      ...state,
      comments: editedComments
    }
    }
    case DELETE_COMMENT_COMPLETED:
    return {
      comments: state.comments.filter(comment => comment.id !== action.payload.comment.id)
    }
    case VOTE_FOR_COMMENT_COMPLETED:
    {
    const editedComments = state.comments.map(comment => {
      if(comment.id === action.payload.comment.id) {
      return action.payload.comment;
      }
      return comment;
    });
    return {
      ...state,
      comments: editedComments
    }
    }
    default:
    {
    return state;
    }
  }
}

export default combineReducers({
  posts, categories, comments
})
