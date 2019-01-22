import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import Store from '../store';

export default class PostDetail extends React.Component {
    state = {
        body: null
    }
    
    render() {
        return (
            <Card>
                <CardBody>
                    <Store.Consumer>
                        {store => {
                            return (
                                <div>
                                    <CardTitle>
                                        <h1>{store.detailViewTitle}</h1>
                                    </CardTitle>
                                    <CardText>
                                        {store.detailViewBody}
                                    </CardText>
                                </div>
                        )}}
                    </Store.Consumer>
                </CardBody>
            </Card>
        )
    }
}