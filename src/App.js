import React from 'react';
import client from './apollo-client';
import { hot } from 'react-hot-loader/root'
import { Link, HashRouter as Router, Route} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import MainList from './MainList/MainList';
import PostDetail from './Post/PostDetail';
import NavigationBar from './Navbar/NavigationBar';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ApolloProvider client={client}>
          <div className="main-grid__navbar">
            <NavigationBar />
          </div>
          <div className="main-grid__flex">
            <Router>
              <React.Fragment>
                <MainList />
                <div className="main-grid__post-detail">
                  <Route path={"/:postId"} component={PostDetail} />
                </div>
              </React.Fragment>
            </Router>
          </div>
        </ApolloProvider>
      </React.Fragment>
    )
  }
}

export default hot(App);