import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg }  from 'reactstrap';

export const ArticleCard = ({ title, body, onClick }) => {
    return (
        <Card onClick={onClick}>
            <CardBody>
                <CardTitle><h3>{title}</h3></CardTitle>
                <CardText>{body}</CardText>
            </CardBody>
        </Card>
    )
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
