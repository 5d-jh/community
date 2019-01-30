import React from 'React';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
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
          <CardBody>
            <CardTitle><h3>글쓰기</h3></CardTitle>
            <PostSubmitForm />
          </CardBody>
        </Card>
      </div>
    )
  }
}