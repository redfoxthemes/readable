import axios from 'axios';

const URL = 'http://localhost:3001';

const client = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'none',
  },
});

/////////////////////////////////////////////
//POSTS API CALLS
////////////////////////////////////////////

export function fetchPostsByCategory(category) {
  return client.get(`/${category}/posts`);
}

export function fetchPosts() {
  return client.get(`/posts`);
}

export function fetchPost(id) {
  return client.get(`/posts/${id}`);
}

export function addNewPost(params) {
  return client.post(`/posts`, params);
}

export function editPost(id, params) {
  return client.put(`/posts/${id}`, params);
}

export function deletePost(id) {
  return client.delete(`/posts/${id}`);
}

export function voteForPost(id, params) {
  return client.post(`/posts/${id}`, params);
}

/////////////////////////////////////////////
//CATEGORIES API CALLS
////////////////////////////////////////////

export function fetchCategories() {
  return client.get(`/categories`);
}

/////////////////////////////////////////////
//COMMENTS API CALLS
////////////////////////////////////////////

export function fetchCommentsByPostID(id) {
    return client.get(`/posts/${id}/comments`);
}

export function addNewComment(params) {
  return client.post(`/comments`, params);
}

export function editComment(id, params) {
  return client.put(`/comments/${id}`, params);
}

export function deleteComment(id) {
  return client.delete(`/comments/${id}`);
}

export function voteForComment(id, params) {
  return client.post(`/comments/${id}`, params);
}
