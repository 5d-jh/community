import React from 'react';
import { Query } from 'react-apollo';
import { POST_LISTS } from '../queries';
import { ArticleCard, PhotoCard, SnippetCard } from './Cards';
import { Button } from 'reactstrap';
import './MainList.css';

export default class MainList extends React.Component {
  state = {
    posts: [],
    page: 0
  }

  fetchPostsByRecent = () => {
    const { posts, page } = this.state;

    this.setState({
      posts: [...posts, (
        <Query query={POST_LISTS(`${page*10}-${(page+1)*10}`)}>
          {({loading, data, error}) => {
            if (error) console.error(error);

            if (loading || !data) {
              return "loading"
            }

            if (data) {
              if (data.postsByRecent.length !== 0) {
                this.setState({
                  page: page + 1
                });
              }

              return data.postsByRecent.map((post, i) => (
                <ArticleCard 
                  key={i} 
                  id={'card'+i} 
                  title={post.title} 
                  body={post.body.preview} 
                  postId={post._id} 
                />
              ))
            }
          }}
        </Query>
      )]
    });
  }

  isBottom = () => {
    const cardListElement = Math.floor(document.getElementById('cardList')
      .getBoundingClientRect().bottom - 5);
    const lastElement = Math.floor(document.getElementById('cardList').lastChild
      .getBoundingClientRect().bottom);

    console.log(cardListElement+10 >= lastElement)

    if (cardListElement >= lastElement) {
      this.fetchPostsByRecent();
    }
  }

  componentDidMount() {
    this.fetchPostsByRecent(); 
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="card-list" /*onScroll={this.isBottom}*/ id="cardList">
        
        <div className="card-list__grid">
          {posts}
          <Button onClick={this.fetchPostsByRecent}>new</Button>
        </div>
      </div>
    )
  }
}