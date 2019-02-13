import React, { Fragment } from 'react';
import client from './apollo-client';
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
import MainList from './MainList/MainList';
import PostDetail from './Post/PostDetail';
import NavigationBar from './Navbar/NavigationBar';
import CreatePost from './Post/CreatePost';
import Categories from './Categories/Categories'
import gql from 'graphql-tag';
import 'semantic-ui-css/semantic.min.css';
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
      <BrowserRouter>
        <Fragment>
          <div className="main-grid__navbar">
            <NavigationBar userSessionInfo={userSessionInfo} />
          </div>
          <div className="main-grid__flex">
            <Categories />
            <ApolloConsumer>
              {client => <MainList client={client} />}
            </ApolloConsumer>
            <div className="main-grid__post-detail">
              <Route path={"/create_post"} component={CreatePost} />
              <Route path={"/view/:postId"} component={PostDetail} />
            </div>
          </div>
        </Fragment>
      </BrowserRouter>
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