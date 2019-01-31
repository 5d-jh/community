import React from 'react';
import { graphql, Query } from 'react-apollo';
import { POST_LISTS, CHECK_NEW_POST } from '../queries';
import { ArticleCard, PhotoCard, SnippetCard } from './Cards';
import { Button } from 'reactstrap';
import './MainList.css';

export default class MainList extends React.Component {
  state = {
    posts: [],
    lastCardId: null,
    page: 0
  }

  fetchPostsByRecent = async () => {
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

              return data.postsByRecent.map((post, i) => {
                if (i === 0) {
                  this.setState({
                    lastCardId: post._id
                  })
                }
                return (
                  <ArticleCard 
                    key={i} 
                    id={'card'+i} 
                    title={post.title} 
                    body={post.body.preview} 
                    postId={post._id} 
                  />
                )
              });
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
    const { posts, lastCardId } = this.state;

    return (
      <div className="card-list" /*onScroll={this.isBottom}*/ id="cardList">
        <div className="card-list__grid" id="card-list-grid">
          {lastCardId ? (
            <Query 
              query={CHECK_NEW_POST}
              variables={{lastPostId: lastCardId}}
              pollInterval={2500}
            >
              {({loading, data, error}) => {
                if (error) return console.log(error);
                if (loading) return "loading...";

                if (data) {
                  return (
                    <Button onClick={this.fetchPostsByRecent} disabled={!Boolean(data.checkNewPost.postList.length)}>
                      {data.checkNewPost.postList.length}개의 새 게시글
                    </Button>
                  )
                }
              }}
            </Query>
          ) : 'loading'}
          
          {posts}
          <Button onClick={this.fetchPostsByRecent}>new</Button>
        </div>
      </div>
    )
  }
}