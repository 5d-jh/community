import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

const Cards = ({ cardType, title, body, postId, id, author, date, location }) => { 
  if (!cardType) return null;

  const cardStyle = {
    width: '100%'
  };

  const postDate = new Date(Number(date));
  let displayDate = postDate.getFullYear() + '-' + postDate.getMonth()+1 + '-' + postDate.getDate();

  if (cardType === 'article') {
    return (
      <Card id={id} style={cardStyle}>
        <Card.Content>
          <Card.Meta>{author} &middot; {displayDate}</Card.Meta>
          <Card.Header as="h3">
            <Link to={{
              pathname: `/view/${postId}`,
              search: location.search
            }}>
              {title}
            </Link>
          </Card.Header>
          <Card.Description>{body}...</Card.Description>
        </Card.Content>
      </Card>
    )
  }

  if (cardType === 'snippet') {
    return (
      <Card id={id} style={cardStyle}>
        <Card.Content>
          <Card.Meta>{author} &middot; {displayDate}</Card.Meta>
          <Card.Description>
            <Link to={{
              pathname: `/view/${postId}`,
              search: location.search
            }}>
              <h4>{body}</h4>
            </Link>
          </Card.Description>
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

export default withRouter(Cards);