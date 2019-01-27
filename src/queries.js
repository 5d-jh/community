import gql from 'graphql-tag';

export const POST_LISTS = (range) => {
  return gql`
    query {
      postsByRecent(range: "${range}") {
        _id
        title
        body {
          preview
        }
      }
    }
  `;
}

export const POST = (id) => {
  return gql`
    query {
      post(id: "${id}") {
        title
        body {
          detail
        }
        comments {
          body
          timestamp
          user
        }
      }
    }
  `;
}