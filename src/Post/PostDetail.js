import React from 'react';
import { Card, 
  CardBody,
  CardTitle,
  Jumbotron, 
  CardText, 
  ListGroup, 
  ListGroupItem,
  ListGroupItemHeading,
  Form,
  Input
} from 'reactstrap';
import { Query, Mutation } from 'react-apollo';
import { COMMENT_LISTS, CREATE_COMMENT, POST } from '../queries';

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
                <h1>{post.title}</h1>
                <Card>
                  <CardBody>
                    <CardTitle>
                      {post.user.username}
                    </CardTitle>
                    <CardText>
                      {post.body.detail}
                    </CardText>
                  </CardBody>
                </Card>

                <Jumbotron style={{
                  margin: 0,
                  padding: '10px'
                }}>
                  <Query
                    query={COMMENT_LISTS}
                    variables={{postId: match.params.postId}}
                  >
                    {({loading, data, error, refetch}) => {
                      if (error) return console.log(error);
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
                                  <Input 
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

                            <ListGroup>
                            {data.post.comments.map((comment, i) => (
                              <ListGroupItem key={i}>
                                <ListGroupItemHeading style={{
                                  fontSize: '13px'
                                }}>
                                  사용자: {comment.user}
                                </ListGroupItemHeading>
                                {comment.body}
                              </ListGroupItem>
                            ))}
                            </ListGroup>
                          </React.Fragment>
                        )
                      }
                    }}
                  </Query>
                </Jumbotron>
              </div>
            )
          }
        }}
      </Query>
    )
  }
}