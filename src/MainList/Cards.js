import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default ({ cardType, title, body, postId, id}) => { 
  if (!cardType) return null;

  const cardStyle = {
    width: '100%'
  };

  if (cardType === 'article') {
    return (
      <Card id={id} href={`#/view/${postId}`} style={cardStyle}>
        <Card.Content>
          <Card.Header><h3>{title}</h3></Card.Header>
          <Card.Description>{body}...</Card.Description>
        </Card.Content>
      </Card>
    )
  }

  if (cardType === 'snippet') {
    return (
      <Card id={id} href={`#/view/${postId}`} style={cardStyle}>
        <Card.Content>
          <Card.Description><h4>{body}</h4></Card.Description>
        </Card.Content>
      </Card>
    )
  }

  if (cardType === 'photo') {
    <Card>
      <Image />
      <Card.Content>
        <Card.Header></Card.Header>
      </Card.Content>
    </Card>
  }
}