import React from 'react';
import { Container, Divider, Form, Header, List } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const COMMENT_LISTS = gql`
  query CommentLists($postId: String!) {
    post(id: $postId) {
      comments {
        body
        date
        user
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body)
  }
`;

const POST = gql`
  query Post($id: String!) {
    post(id: $id) {
      title
      user {
        userId
        username
      }
      body {
        detail
      }
    }
  }
`;

export default class PostDetail extends React.Component {
  state = {
    commentToSubmit: null
  }

  render() {
    const { match } = this.props;
    const { commentToSubmit } = this.state;

    return (
      <Query 
        query={POST}
        variables={{id: match.params.postId}}
      >
        {({loading, data, error}) => {
          if (loading) {
            return "loading";
          }

          if (error) {
            console.log(error)
            return "error";
          }

          if (data) {
            const { post } = data;

            return (
              <div style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '700px'
              }}>
                <Container textAlign="center">
                  {post.user.username}
                  <Header as="h2">
                    <h1>{post.title}</h1>
                  </Header>
                </Container>
                <Container>
                  {post.body.detail}
                <Divider />
                  <Query
                    query={COMMENT_LISTS}
                    variables={{postId: match.params.postId}}
                  >
                    {({loading, data, error, refetch}) => {
                      if (error) {
                        console.log(error);
                        return null;
                      }
                      if (loading) return "loading";

                      if (data) {
                        return (
                          <React.Fragment>
                            <Mutation 
                              mutation={CREATE_COMMENT}
                              variables={{
                                postId: match.params.postId,
                                body: commentToSubmit
                              }}
                              onCompleted={refetch}
                            >
                              {commentMutation => (
                                <Form onSubmit={commentMutation} style={{
                                  marginBottom: '10px'
                                }}>
                                  <input 
                                    type="text"
                                    onChange={e => {this.setState({
                                      commentToSubmit: e.target.value
                                    })}} 
                                    placeholder="press enter to submit" 
                                    style={{
                                      backgroundColor: 'transparent'
                                    }} 
                                  />
                                </Form>
                              )}
                            </Mutation>

                            <List>
                            {data.post.comments.map((comment, i) => (
                              <List.Item key={i}>
                                <List.Header>
                                  사용자: {comment.user}
                                </List.Header>
                                {comment.body}
                              </List.Item>
                            ))}
                            </List>
                          </React.Fragment>
                        )
                      }
                    }}
                  </Query>
                </Container>
              </div>
            )
          }
        }}
      </Query>
    )
  }
}