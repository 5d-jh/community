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
      }
    }
  `;
}

export const COMMENT_LISTS = (postId) => {
  return gql`
    query {
      post(id: "${postId}") {
        comments {
          body
          timestamp
          user
        }
      }
    }
  `;
}

export const USER_SESSION_INFO = gql`
  query {
    userSessionInfo {
      username
    }
  }
`;

export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $body: String!) {
      createPost(title: $title, body: $body)
    }
  `;