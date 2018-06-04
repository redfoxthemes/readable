import * as api from '../utils/api';

export const FETCH_CATEGORIES_COMPLETED = 'FETCH_CATEGORIES_COMPLETED';

//////////////////////////////////////////////////////////////
//USER OR VIEW ACTIONS - initiated by User
//////////////////////////////////////////////////////////////

//fetchCategories() fetches all categories from api and dispatches fetchCategoriesCompleted(categories) to provide new category object array to reducer.
export function fetchCategories() {
  return  dispatch =>  {
    api.fetchCategories().then(hits => {
      dispatch(fetchCategoriesCompleted(hits.data));
    });
  }
}

//////////////////////////////////////////////////////////////
// SERVER ACTIONS - initiated by Server
//////////////////////////////////////////////////////////////

//fetchPostsCompleted(posts) is an action creator that returns new categories objects array to reducer
export function fetchCategoriesCompleted(categories) {
  return {
    type: 'FETCH_CATEGORIES_COMPLETED',
    payload: {
      categories,
    },
  };
}
