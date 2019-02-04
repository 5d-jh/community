import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg }  from 'reactstrap';
import { Link } from 'react-router-dom';
// import Store from '../store';

const ArticleCard = ({ title, body, postId, id }) => {
  return (
    <Card id={id} style={{
      marginBottom: '5px',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#f7f7f7'
    }}>
      <Link to={`/view/${postId}`} style={{
        color: 'black',
        textDecoration: 'none'
      }}>
        <CardBody>
          <CardTitle><h3>{title}</h3></CardTitle>
          <CardText>{body}...</CardText>
        </CardBody>
      </Link>
    </Card>
  )
}

const PhotoCard = () => {
    return (
        <Card>
            <CardImg />
            <CardBody>
                <CardTitle></CardTitle>
            </CardBody>
        </Card>
    )
}

const SnippetCard = ({ body, onClick }) => {
    return (
        <Card onClick={onClick}>
            <CardBody>
                <CardText><h3>{body}</h3></CardText>
            </CardBody>
        </Card>
    )
}

export default ({ cardType, title, body, postId, id}) => { 
  if (!cardType) return null;

  const cardStyle = {
    marginBottom: '5px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#f7f7f7'
  };

  if (cardType === 'article') {
    return (
      <Card id={id} style={cardStyle}>
        <Link to={`/view/${postId}`} style={{
          color: 'black',
          textDecoration: 'none'
        }}>
          <CardBody>
            <CardTitle><h3>{title}</h3></CardTitle>
            <CardText>{body}...</CardText>
          </CardBody>
        </Link>
      </Card>
    )
  }

  if (cardType === 'snippet') {
    return (
      <Card id={id} style={cardStyle}>
        <Link to={`/view/${postId}`}>
          <CardBody>
            <CardText><h4>{body}</h4></CardText>
          </CardBody>
        </Link>
      </Card>
    )
  }

  if (cardType === 'photo') {
    <Card>
      <CardImg />
      <CardBody>
        <CardTitle></CardTitle>
      </CardBody>
    </Card>
  }
}