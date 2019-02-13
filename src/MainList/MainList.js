import React from 'react';
import { HashRouter as Route, withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Cards from './Cards';
import { Button } from 'semantic-ui-react';
import './MainList.css';
import queryString from 'query-string';

const POST_LISTS = gql`
  query PostsByRecent($skip: Int!, $limit: Int!, $category: String) {
    postsByRecent(skip: $skip, limit: $limit, category: $category) {
      _id
      title
      body {
        preview
      }
      user {
        username
      }
      postType
      date
    }
  }
`;

const CHECK_NEW_POST = gql`
  query CheckNewPost($lastPostId: String!, $category: String) {
    checkNewPost(lastPostId: $lastPostId, category: $category) {
      isNewPost
      postList {
        _id
      }
    }
  }
`;

class MainList extends React.Component {
  state = {
    posts: [],
    page: 0,
    category: null
  }

  newerPosts = 0;

  isBottom = () => {
    const cardListElement = Math.floor(document.getElementById('cardList')
      .getBoundingClientRect().bottom - 5);
    const lastElement = Math.floor(document.getElementById('cardList').lastChild
      .getBoundingClientRect().bottom);

    console.log(cardListElement+10 >= lastElement)

    if (cardListElement >= lastElement) {
      this.fetchPostsByRecent();
    }
  }

  fetchNewerPosts = (howmany) => {
    return () => {
      const { client } = this.props;
      const { posts } = this.state;
  
      client.query({
        query: POST_LISTS,
        variables: {
          skip: 0,
          limit: howmany
        }
      })
      .then(({ data : { postsByRecent } }) => {
        this.setState({
          posts: [...postsByRecent, ...posts],
          newestPostId: postsByRecent[0]._id
        });
      });
    }
  }

  fetchOlderPosts = () => {
    const { client } = this.props;
    const { posts, page, category } = this.state;


    client.query({
      query: POST_LISTS,
      variables: {
        skip: page * 10 + this.newerPosts,
        limit: 10,
        category
      }
    })
    .then(({ data : { postsByRecent } }) => {
      this.setState({
        posts: [...posts, ...postsByRecent],
        page: postsByRecent.length !== 0 ? page + 1 : page,
        newestPostId: (posts[0] || postsByRecent[0])._id
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;

    if (nextProps.location.search !== location.search) {
      this.setState({
        posts: [],
        page: 0,
        category: queryString.parse(nextProps.location.search).category
      }, this.fetchOlderPosts);
    }
  }

  componentDidMount() {
    this.fetchOlderPosts();
  }

  render() {
    const { posts, newestPostId, category } = this.state;

    return (
      <div className="card-list" /*onScroll={this.isBottom}*/ id="cardList">
        <div className="card-list__grid" id="card-list-grid">

          <Route path={"/:category"} component={<h1>asdf</h1>} />

          {newestPostId ? (
            <Query
              query={CHECK_NEW_POST}
              variables={{ 
                lastPostId: newestPostId,
                category
              }}
              pollInterval={2500}
            >
              {({loading, data, error}) => {
                if (error) {
                  console.log(error);
                  return null;
                } 
                if (loading) return "loading...";

                if (data) {
                  if (data.checkNewPost.postList.length !== 0) {
                    this.newerPosts = data.checkNewPost.postList.length;
                    return (
                      <Button
                        onClick={this.fetchNewerPosts(data.checkNewPost.postList.length)}
                      >
                        {data.checkNewPost.postList.length}개의 새 게시글
                      </Button>
                    )
                  }
                }

                return null;
              }}
            </Query>
          ) : null}

          {posts.map((post, i) => (
            <Cards
              cardType={post.postType}
              key={i}
              id={'card'+i}
              title={post.title}
              body={post.body.preview}
              postId={post._id}
              author={post.user.username}
              date={post.date}
            />
          ))}

          <Button onClick={this.fetchOlderPosts}>
            더 불러오기
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(MainList);