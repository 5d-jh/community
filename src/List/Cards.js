import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg }  from 'reactstrap';
import Store from '../store';

export class ArticleCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: ''
        };
    }

    componentDidMount() {
        const { title, body } = this.props;
        this.setState({title, body});
    }

    render() {
        const { title, body, postId, id } = this.props;

        return (
            <Store.Consumer>
                {store => (
                    <Card id={id} onClick={store.updateDetailViewPost(title, postId)} style={{
                        marginBottom: '5px',
                        cursor: 'pointer'
                    }}>
                        <CardBody>
                            <CardTitle><h3>{title}</h3></CardTitle>
                            <CardText>{body}...</CardText>
                        </CardBody>
                    </Card>
                )}
            </Store.Consumer>
            
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
