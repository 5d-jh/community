import React from 'react';
import { ArticleCard, PhotoCard, SnippetCard } from './Cards';
import './CardsList.css';
import PostSubmitForm from './PostSubmitForm';

export default class CardsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }

    this.fetchPostByRecent = () => {
      fetch('http://localhost:8080/api/post/recent/0-30')
      .then(data => data.json())
      .then(posts => {
        this.setState({
          posts: [...posts.reverse(), ...this.state.posts]
        });
      });
    }
  }

  componentDidMount() {
    this.fetchPostByRecent();
  }

  render() {
    const { posts } = this.state;

    return (
      <div>
        <PostSubmitForm fpbr={this.fetchPostByRecent} />
        <div className="card-list__grid">
          {posts.map((post, i) => (
            <ArticleCard key={i} title={post.title} body={post.body.preview} postId={post._id} />
          ))}
        </div>  
      </div>
    )
  }
}