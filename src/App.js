import React from 'react';
import client from './apollo-client';
import { hot } from 'react-hot-loader/root'
import { Link, HashRouter as Router, Route} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import MainList from './MainList/MainList';
import PostDetail from './Post/PostDetail';
import NavigationBar from './Navbar/NavigationBar';
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
              
                <React.Fragment>
                  <MainList />
                  <div className="main-grid__post-detail">
                    <Route path={"/:postId"} component={PostDetail} />
                  </div>
                </React.Fragment>
              
            </div>
          </React.Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}

export default hot(App);