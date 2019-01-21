import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

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