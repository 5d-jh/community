import React from 'react';
import { ArticleCard, PhotoCard, SnippetCard } from './Cards';
import './CardsList.css';

export default class CardsList extends React.Component {
    state = {
        posts: []
    }

    fetchPostByRecent = () => {
        fetch('http://localhost:8080/api/post/recent/0-10')
        .then(data => data.json())
        .then(posts => {
            this.setState({
                posts: [...this.state.posts, ...posts]
            });
        });
    }

    componentDidMount() {
        this.fetchPostByRecent();
    }

    render() {
        const { posts } = this.state;

        return (
            <div className="card-list__grid">
                {posts.map((post, i) => (
                    <ArticleCard key={i} title={post.title} body={post.body.preview} postId={post._id} />
                ))}
            </div>  
        )
    }
}