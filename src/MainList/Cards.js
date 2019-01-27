import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg }  from 'reactstrap';
import { Link } from 'react-router-dom';
// import Store from '../store';

export class ArticleCard extends React.Component {
    render() {
        const { title, body, postId, id } = this.props;

        return (
            <Card id={id} style={{
                marginBottom: '5px',
                cursor: 'pointer'
            }}>
                <CardBody>
                    <CardTitle><Link to={`/${postId}`}><h3>{title}</h3></Link></CardTitle>
                    <CardText>{body}...</CardText>
                </CardBody>
            </Card>
        )
    }
}

export const PhotoCard = () => {
    return (
        <Card>
            <CardImg />
            <CardBody>
                <CardTitle></CardTitle>
            </CardBody>
        </Card>
    )
}

export const SnippetCard = ({ body, onClick }) => {
    return (
        <Card onClick={onClick}>
            <CardBody>
                <CardText><h3>{body}</h3></CardText>
            </CardBody>
        </Card>
    )
}
