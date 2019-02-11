import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default ({ cardType, title, body, postId, id, author, date}) => { 
  if (!cardType) return null;

  const cardStyle = {
    width: '100%'
  };

  const postDate = new Date(Number(date));
  let displayDate = postDate.getFullYear() + '-' + postDate.getMonth()+1 + '-' + postDate.getDate();

  if (cardType === 'article') {
    return (
      <Card id={id} href={`#/view/${postId}`} style={cardStyle}>
        <Card.Content>
          <Card.Meta>{author} &middot; {displayDate}</Card.Meta>
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
          <Card.Meta>{author} &middot; {displayDate}</Card.Meta>
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