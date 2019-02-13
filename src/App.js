import React, { Fragment } from 'react';
import client from './apollo-client';
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
import MainList from './LeftPane/MainList';
import PostDetail from './RightPane/PostDetail';
import NavigationBar from './TopPane/NavigationBar';
import CreatePost from './Post/CreatePost';
import Categories from './Categories/Categories'
import gql from 'graphql-tag';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { CommunityContextConsumer } from './store';

const USER_SESSION_INFO = gql`
  query {
    userSessionInfo {
      username
    }
  }
`;

class App extends React.Component {
  componentDidMount() {
    const { context: { actions }, client } = this.props;

    client.query({ query: USER_SESSION_INFO })
    .then(({ data: { userSessionInfo } }) => {
      actions.setValue({ userSessionInfo });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <div className="main-grid__navbar">
            <NavigationBar />
          </div>
          <div className="main-grid__flex">
            <Categories />
              <MainList client={client} />
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
      {client => (
        <CommunityContextConsumer>
          {value => <App context={value} client={client} />}
        </CommunityContextConsumer>
      )}
    </ApolloConsumer>
  </ApolloProvider>
);