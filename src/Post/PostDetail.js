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
    return (
      <Store.Consumer>
        {store => {
          const { 
            detailViewLoaded,
            detailViewPostId,
            detailViewTitle, 
            detailViewUser, 
            detailViewBody, 
            detailViewComments
          } = store;

          const { comments } = this.state;

          console.log(comments.length);
          
          const _comments = comments.length != 0 ? comments : detailViewComments;

          return (
            detailViewLoaded ? (
            <div>
              {console.log(detailViewLoaded)}
              <h1>{detailViewTitle}</h1>
              <p>사용자: {detailViewUser}</p>
              <Card>
                <CardBody>
                  <CardText>
                    {detailViewBody}
                  </CardText>
                </CardBody>
              </Card>
              <Jumbotron style={{
                margin: 0,
                padding: '10px'
              }}>
                <Form onSubmit={this.submitComment(detailViewPostId)} style={{
                  marginBottom: '10px'
                }}>
                  <Input type="text" onChange={this.onCommentChange} placeholder="press enter to submit" style={{
                    backgroundColor: 'transparent'
                  }} />
                </Form>
                <ListGroup>
                  {_comments.map((comment, i) => (
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
            </div> ) : null
        )}}
      </Store.Consumer>
    )
  }
}