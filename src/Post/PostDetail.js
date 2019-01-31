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
    commentToSubmit: 'yo',
    comments: []
  }

  fetchComments = () => {
    const { match } = this.props;

    this.setState({
      comments: (
        <Query query={COMMENT_LISTS(match.params.postId)}>
          {({loading, data, error}) => {
            if (error) console.log(error);

            if (loading) {
              return (
                <ListGroupItem>
                  불러오는 중..
                </ListGroupItem>
              )
            }

            if (data) {
              return data.post.comments.map((comment, i) => (
                <ListGroupItem key={i}>
                  <ListGroupItemHeading style={{
                    fontSize: '13px'
                  }}>
                    사용자: {comment.user}
                  </ListGroupItemHeading>
                  {comment.body}
                </ListGroupItem>
              ));
            }
          }}
        </Query>
      )
    })
  }

  shouldComponentUpdate(nextProp, nextState) {
    const { match } = this.props;
    const { commentToSubmit } = this.state;

    if (commentToSubmit !== nextState.commentToSubmit) return true;

    return nextState.comments.length !== this.state.comments.length ||
    nextProp.match.params.postId !== match.params.postId
  }

  render() {
    const { match } = this.props;
    const { comments, commentToSubmit } = this.state;

    return (
      <Query query={POST(match.params.postId)}>
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

            this.fetchComments();

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
                  <Mutation 
                    mutation={CREATE_COMMENT}
                    variables={{
                      postId: match.params.postId,
                      body: commentToSubmit
                    }}
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
                    {comments}
                  </ListGroup>
                </Jumbotron>
              </div>
            )
          }
        }}
      </Query>
    )
  }
}