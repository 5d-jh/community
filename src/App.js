import React from 'react';
import client from './apollo-client';
import { hot } from 'react-hot-loader/root'
import { HashRouter as Router, Route} from 'react-router-dom';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
import MainList from './MainList/MainList';
import PostDetail from './Post/PostDetail';
import NavigationBar from './Navbar/NavigationBar';
import CreatePost from './Post/CreatePost';
import Categories from './Categories/Categories'
import gql from 'graphql-tag';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const USER_SESSION_INFO = gql`
  query {
    userSessionInfo {
      username
    }
  }
`;

class App extends React.Component {
  state = {
    userSessionInfo: null
  }

  componentDidMount() {
    const { client } = this.props;

    client.query({ query: USER_SESSION_INFO })
    .then(({ data: { userSessionInfo } }) => {
      this.setState({ userSessionInfo });
    })
  }

  render() {
    const { userSessionInfo } = this.state;

    return (
      <Router>
        <React.Fragment>
          <div className="main-grid__navbar">
            <NavigationBar userSessionInfo={userSessionInfo} />
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
    )
  }
}

export default hot(() => 
  <ApolloProvider client={client}>
    <ApolloConsumer>
      {client => <App client={client} />}
    </ApolloConsumer>
  </ApolloProvider>
);