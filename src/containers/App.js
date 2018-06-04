import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import PostList from './postList';
import { fetchCategories } from '../actions/categoryActions';
import {fetchPosts, fetchPostsByCategory } from '../actions/postActions';

// App Class is a main Component. The user is not authenticated and is simply set to 'admin'
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: 'admin',
      fetchByCategory: false,
      selectedCategory: ''
    };
  }

  // componentDidMount() does the initial fetching of all posts using fetchPosts() and all categories using fetchCategories()
componentDidMount() {
  this.props.dispatch(fetchCategories());
}
// setSelectedCategory(e, category) sets a category state selected by user, and dispatches fetchPostsByCategory(category)
setSelectedCategory(e, category){
  e.preventDefault();
  this.setState({
    selectedCategory: category
  });
  this.props.dispatch(fetchPostsByCategory(category));
}
// handleOnClickAllCategories() fetches all posts
handleOnClickAllCategories(e){
  e.preventDefault();
  this.props.dispatch(fetchPosts());
  this.setState({
    selectedCategory: ''
  });
}

  render(){
    const { categories, posts } = this.props;
    const {user, selectedCategory} = this.state;
    return (
      <div className='mainContent'>
            <div className='appTitle' onClick = {(e) => this.handleOnClickAllCategories(e)}>
              <Link to='/'>
              <h1>Readable</h1>
              </Link>
            </div>
            <h2 id='app-subtitle'>
              - post, sleep, repeat
            </h2>

            <div className="row">
              <div className='column-3'>
                <h4>
                    You are logged in as <strong>{this.state.user}</strong>
                </h4>
                <div className='nav'>
                  <ul id='categorylist'>
                    <li className='default-nav' onClick = {(e) => this.handleOnClickAllCategories(e)} >
                    <Link to='/'>
                        all
                    </Link>
                    </li>
                    {categories && categories.map((category) => (
                      <li className='category-nav' key={category.path}  onClick = {(e) => this.setSelectedCategory(e, category.name)}>
                    <Link to={`/${category.name}`}>
                      <h3>{category.name}</h3>
                    </Link>
                    </li>
                    ))}
                  </ul>
                </div>
              </div>
        <div className='column-9'>
          <Route exact path='/'  render={(history) => (
              <div className='postList'>
                  <PostList categories={categories} posts={posts} selectedCategory={selectedCategory} user={user}/>
              </div>
            )}/>
          <Route path='/:category'  render={(history) => (
            <div className='postList'>
                <PostList categories={categories} posts={posts} selectedCategory={selectedCategory} user={user}/>
            </div>
          )}/>
        </div>
      </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {categories: state.categories.categories.categories,
    postsLoading: state.posts
  };
}
export default connect(mapStateToProps)(App);
