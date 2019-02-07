import gql from 'graphql-tag';

export const POST_LISTS = gql`
  query PostsByRecent($skip: Int!, $limit: Int!) {
    postsByRecent(skip: $skip, limit: $limit) {
      _id
      title
      body {
        preview
      }
      postType
    }
  }
`;

export const POST = gql`
  query Post($id: String!) {
    post(id: $id) {
      title
      user {
        userId
        username
      }
      body {
        detail
      }
    }
  }
`;

export const COMMENT_LISTS = gql`
  query CommentLists($postId: String!) {
    post(id: $postId) {
      comments {
        body
        date
        user
      }
    }
  }
`;


export const USER_SESSION_INFO = gql`
  query {
    userSessionInfo {
      username
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation CreatePost(
    $title: String!, 
    $body: String!, 
    $postType: String!, 
    $category: String) {
    createPost(title: $title, body: $body, postType: $postType, category: $category)
  }
`;

export const CREATE_SNIPPET = gql`
  mutation CreateSnippet($body: String!, $postType: String!, $category: String) {
    createPost(body: $body, postType: $postType, category: $category)
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body)
  }
`;

export const CHECK_NEW_POST = gql`
  query CheckNewPost($lastPostId: String!) {
    checkNewPost(lastPostId: $lastPostId) {
      isNewPost
      postList {
        _id
      }
    }
  }
`