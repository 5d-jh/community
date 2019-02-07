import React from 'react';
import client from './apollo-client';
import { hot } from 'react-hot-loader/root'
import { Link, HashRouter as Router, Route} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import MainList from './MainList/MainList';
import PostDetail from './Post/PostDetail';
import NavigationBar from './Navbar/NavigationBar';
import CreatePost from './Post/CreatePost';
import Categories from './Categories/Categories'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <React.Fragment>
            <div className="main-grid__navbar">
              <NavigationBar />
            </div>
            <div className="main-grid__flex">
              <Categories />
              <MainList />
              <div className="main-grid__post-detail">
                <Route path={"/create_post"} component={CreatePost} />
                <Route path={"/view/:postId"} component={PostDetail} />
              </div>
            </div>
          </React.Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}

export default hot(App);