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
      fetch('http://localhost:3000/api/post/recent/0-10')
      .then(data => data.json())
      .then(posts => {
        this.setState({
          posts: [...posts, ...this.state.posts]
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
        <PostSubmitForm onSubmitPost={this.fetchPostByRecent} />
        <div className="card-list__grid">
          {posts.map((post, i) => (
            <ArticleCard key={i} title={post.title} body={post.body.preview} postId={post._id} />
          ))}
        </div>  
      </div>
    )
  }
}