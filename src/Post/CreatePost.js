import React from 'React';
import { Card } from 'semantic-ui-react';
import PostSubmitForm from './PostSubmitForm';

export default class CreatePost extends React.Component {
  render() {
    return (
      <div>
        <Card style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '700px'
        }}>
          <Card.Content>
            <Card.Header><h3>글쓰기</h3></Card.Header>
            <PostSubmitForm />
          </Card.Content>
        </Card>
      </div>
    )
  }
}