import React from 'react';
import { Query, withApollo } from 'react-apollo';
import { POST_LISTS, CHECK_NEW_POST } from '../queries';
import Cards from './Cards';
import { Button } from 'reactstrap';
import './MainList.css';

class MainList extends React.Component {
  state = {
    postCards: [],
    updatedPostCards: null,
    newestPostId: null,
    shouldMountPostLiveUpdater: true,
    page: 0,
    refetchPostCards: null
  }

  // updateNewPosts = (howmany) => {
  //   return () => {
  //     this.setState({
  //       updatedPostCards: (
  //         <Query
  //           query={POST_LISTS}
  //           variables={{
  //             range: 0 + '-' + howmany
  //           }}
  //         >
  //           {({loading, data, error}) => {
  //             if (error) console.error(error);
  
  //             if (loading || !data) {
  //               return "loading"
  //             }
  
  //             if (data) {
  //               return data.postsByRecent.map((post, i) => {
  //                 if (i === 0) {
  //                   this.setState({
  //                     newestPostId: post._id
  //                   })
  //                 }
  //                 return (
  //                   <Cards 
  //                     cardType={false}
  //                     key={i} 
  //                     id={'card'+i} 
  //                     title={post.title} 
  //                     body={post.body.preview} 
  //                     postId={post._id} 
  //                   />
  //                 )
  //               });
  //             }
  //           }}
  //         </Query>
  //       )
  //     });
  //   }
  // }

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

  render() {
    const { shouldMountPostLiveUpdater, newestPostId, updatedPostCards, postCards, page, refetchPostCards } = this.state;

    return (
      <div className="card-list" /*onScroll={this.isBottom}*/ id="cardList">
        <div className="card-list__grid" id="card-list-grid">
          {updatedPostCards}

          <Query
            query={CHECK_NEW_POST}
            variables={{lastPostId: newestPostId}}
            pollInterval={2500}
          >
            {({loading, data, error}) => {
              if (error) {
                console.log(error);
                return null;
              } 
              if (loading) return "loading...";

              if (data) {
                if (data.checkNewPost.postList.length !== 0) {
                  return (
                    <Button
                      onClick={() => {
                        this.setState({
                          shouldMountPostLiveUpdater: true
                        }, () => {
                          refetchPostCards({
                            variables: 0 + '-' + data.checkNewPost.postList.length
                          })
                        });
                          
                      }}
                      disabled={!Boolean(data.checkNewPost.postList.length)}
                    >
                      {data.checkNewPost.postList.length}개의 새 게시글
                    </Button>
                  )
                }
                return null;
              }

            }}
          </Query>

          {postCards}

          <Query
            query={POST_LISTS}
            variables={{
              range: page*10 + '-' + (page+1)*10
            }}
          >
            {({ loading, data , error, refetch }) => {
              if (error) console.error(error);
  
              if (loading || !data) {
                return "loading"
              }
  
              if (data) {
                const mappedPostCards = data.postsByRecent.map((post, i) => {
                  if ((i === 0 && newestPostId !== post._id)&& shouldMountPostLiveUpdater) {
                    this.setState({
                      refetchPostCards: refetch,
                      newestPostId: post._id
                    });
                  }

                  return (
                    <Cards
                      cardType={post.postType}
                      key={i}
                      id={'card'+i}
                      title={post.title}
                      body={post.body.preview}
                      postId={post._id}
                    />
                  )
                });

                return (
                  <React.Fragment>
                    {mappedPostCards}
                    <Button onClick={() => {
                      this.setState({
                        page: mappedPostCards.length !== 0 ? page + 1 : page,
                        postCards: [postCards, ...mappedPostCards],
                        shouldMountPostLiveUpdater: false,
                      }, refetch);
                    }}>
                      더 불러오기
                    </Button>
                  </React.Fragment>
                )
              }
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default withApollo(MainList);