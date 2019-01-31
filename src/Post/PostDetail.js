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
import { Query } from 'react-apollo';
import { COMMENT_LISTS, POST } from '../queries';

export default class PostDetail extends React.Component {
  state = {
    commentToSubmit: '',
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
      })
      .then(this.fetchComments);
    }
  }

  onCommentFormChange = (event) => {
    this.setState({
      commentToSubmit: event.target.value
    });
  }

  shouldComponentUpdate(nextProp, nextState) {
    const { match } = this.props;

    return nextState.comments.length !== this.state.comments.length ||
    nextProp.match.params.postId !== match.params.postId
  }

  render() {
    const { match } = this.props;
    const { comments } = this.state;

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
                  <Form /* onSubmit={this.submitComment(detailViewPostId)}*/ style={{
                    marginBottom: '10px'
                  }}>
                    <Input type="text" onChange={this.onCommentFormChange} placeholder="press enter to submit" style={{
                      backgroundColor: 'transparent'
                    }} />
                  </Form>
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