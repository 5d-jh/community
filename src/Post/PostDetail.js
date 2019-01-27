import React from 'react';
import { Card, 
  CardBody, 
  Jumbotron, 
  CardText, 
  ListGroup, 
  ListGroupItem,
  ListGroupItemHeading,
  Form,
  Input
} from 'reactstrap';
import Store from '../store';
import { Query } from 'react-apollo';
import { POST } from '../queries';

export default class PostDetail extends React.Component {
  state = {
    commentToSubmit: '',
    comments: []
  }

  submitComment = (postId) => {
    return (event) => {
      event.preventDefault();

      fetch('http://localhost:3000/api/post/comment/'+postId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: this.state.commentToSubmit
        })
      });
    }
  }

  onCommentChange = (event) => {
    this.setState({
      commentToSubmit: event.target.value
    });
  }

  render() {
    const { match } = this.props;

    return (
      <Query query={POST(match.params.postId)}>
        {({loading, data, error}) => {
          if (loading) {
            return "loading";
          }

          if (data) {
            const { post } = data;

            return (
              <React.Fragment>
                <h1>{post.title}</h1>
                <Card>
                  <CardBody>
                    <CardText>
                      {post.body.detail}
                    </CardText>
                  </CardBody>
                </Card>
                <Jumbotron style={{
                  margin: 0,
                  padding: '10px'
                }}>
                  <Form /* onSubmit={this.submitComment(detailViewPostId)}*/ style={{
                    marginBottom: '10px'
                  }}>
                    <Input type="text" onChange={this.onCommentChange} placeholder="press enter to submit" style={{
                      backgroundColor: 'transparent'
                    }} />
                  </Form>
                  <ListGroup>
                    {post.comments.map((comment, i) => (
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
                </Jumbotron>
              </React.Fragment>
            )
          }
        }}
      </Query>
    )
  }
}