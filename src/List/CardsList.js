import React from 'react';
import { ArticleCard, PhotoCard, SnippetCard } from './Cards';
import { Spinner } from 'reactstrap';
import './CardsList.css';
import PostSubmitForm from './PostSubmitForm';

export default class CardsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 0
    }

    this.fetchPostByRecent = () => {
      const { page } = this.state;

      const url = `http://localhost:3000/api/post/recent/${page*10}-${(page+1)*10}`;
      fetch(url)
      .then(data => data.json())
      .then(posts => {
        this.setState({
          posts: [...this.state.posts, ...posts],
          page: this.state.page + 1
        });
      });
    }
  }

  isBottom = () => {
    const cardListElement = Math.floor(document.getElementById('cardList')
      .getBoundingClientRect().bottom - 5);
    const lastElement = Math.floor(document.getElementById('card' + (this.state.posts.length-1))
      .getBoundingClientRect().bottom);

    if (cardListElement >= lastElement) {
      
      this.fetchPostByRecent();
    }
  }

  componentDidMount() {
    this.fetchPostByRecent();
  }

  render() {
    const { posts, page } = this.state;

    return (
      <div className="card-list" onScroll={this.isBottom} id="cardList">
        <PostSubmitForm onSubmitPost={this.fetchPostByRecent} />
        <div className="card-list__grid">
          {posts.map((post, i) => (
            <ArticleCard key={i} id={'card'+i} title={post.title} body={post.body.preview} postId={post._id} />
          ))}
        </div>  
        loading
      </div>
    )
  }
}