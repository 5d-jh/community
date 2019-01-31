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
    userId: String!
    username: String!
  }

  type Post {
    _id: String
    title: String,
    body: PostBody,
    user: UserBody,
    tag: String,
    comments: [Comment] 
  }

  type Query {
    postsByRecent(range: String!): [Post]!

    post(id: String!): Post

    userSessionInfo: UserBody

    user(id: String!): UserBody
  }

  type Mutation {
    createPost(
      title: String!, 
      body: String!
    ): String

    createComment(postId: String!, body: String!): Boolean!

    createUser(
      username: String!,
      password: String!
    ): Boolean!
  }
`