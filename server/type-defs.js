export default `
  type Comment {
    body: String!,
    timestamp: String!,
    user: String!
  }

  type PostBody {
    preview: String,
    detail: String!
  }
  
  type UserBody {
    username: String!
  }

  type Post {
    _id: String
    title: String,
    body: PostBody,
    user: String,
    tag: String,
    comments: [Comment] 
  }

  type Query {
    postsByRecent(range: String!): [Post]!
    post(id: String!): Post
    userSessionInfo: UserBody
  }

  type Mutation {
    createPost(
      title: String!, 
      body: String!
    ): String

    createComment(postId: String!): Boolean!

    createUser(
      username: String!,
      password: String!
    ): Boolean!
  }
`