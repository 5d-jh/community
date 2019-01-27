import React from 'react';
import CardsList from './List/CardsList';
import NavigationBar from './Navbar/NavigationBar';
import PostDetail from './Post/PostDetail';
import Store from './store';

export default class Home extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <div className="main-grid__navbar">
          {/* <NavigationBar getSessionUserInfo={this.getSessionUserInfo} /> */}
        </div>
        <div className="main-grid__flex">
          <div>
            <CardsList />
          </div>
          <div className="main-grid__post-detail">
            {/* <PostDetail /> */}
          </div>
        </div>
      </React.Fragment>
    )
    
  }
}