import { Types } from 'mongoose'
import PostModel from './model-post';
import UserModel from './model-user';

class Resolvers {
  postsByRecent = async ({ skip, limit, category }) => {
    const posts = await PostModel.find(category ? { category } : {})
    .sort('-date').skip(skip).limit(limit).lean()
    .catch(err => Error(err))

    const users = await UserModel.find({
      _id: {
        $in: posts.map(post => Types.ObjectId(post.user))
      }
    }).lean();

    const usersDict = {};

    for (const users_idx in users) {
      usersDict[String(users[users_idx]._id)] = {
        userId: String(users[users_idx]._id),
        username: String(users[users_idx].username)
      };
    }

    for (const posts_idx in posts) {
      posts[posts_idx].user = usersDict[posts[posts_idx].user];
    }

    return posts;
  }

  post = async ({ id }) => {
    const post = await PostModel.findById(id).lean()
    .catch(err => err);

    return await UserModel.findById(Types.ObjectId(post.user))
    .then(user => ({
      _id: post._id,
      title: post.title,
      body: post.body,
      user: {
        userId: user._id,
        username: user.username
      },
      comments: post.comments
    }))
    .catch(err => err);
  }
  
  createPost = async ({ title, body, postType, category }, { session }) => {
    if (!session.passport) {
      return false;
    }

    const postBody = body;
    let omittedArray = postBody.split(' ');
    if (omittedArray.length > 0) {
      omittedArray = omittedArray.slice(0, 10);
    }

    let omittedString = '';
    for (const i in omittedArray) {
      omittedString += omittedArray[i] + ' ';
    }

    if (omittedString.length > 121) {
      omittedString = omittedString.slice(0, 120);
    }

    const postToSubmit = {
      postType,
      title,
      category,
      body: {
        preview: omittedString,
        detail: body
      },
      date: new Date(),
      user: session.passport.user
    };
    return await PostModel.create(postToSubmit)
    .then(post => post._id)
    .catch(err => err);
  }

  createComment = async ({ postId, body }, { session }) => {
    if (!session.passport) {
      return false;
    }

    await PostModel.findByIdAndUpdate(postId, {
      $push: {
        comments: {
          body,
          date: new Date(),
          user: session.passport.user
        }
      }
    })
    .catch(err => console.error(err));

    return true;
  }

  deletePost = async () => {
    if (!session.passport) {
      return false;
    }

    const condition = {
      _id: req.params.postId,
      user: req.session.passport.user
    };
    await PostModel.findOneAndDelete(condition)
    .catch(err => console.error(err));
    
    return true;
  }

  createUser = async ({ username, password }) => {
    const object = {username, password}
    return await UserModel.findOneAndUpdate(object, object, {upsert: true})
    .then(user => !user)
    .catch(err => console.error(err));
  }

  userSessionInfo = async (_, { session }) => {
    if (!session.passport) {
      return;
    }

    const projection = {
      username: true
    };
    return await UserModel.findById(session.passport.user, projection)
    .catch(err => console.error(err));
  }

  user = async ({id}) => {
    return await UserModel.findById(id)
    .then(user => user._id)
    .catch(err => err);
  }

  checkNewPost = async ({lastPostId}) => {
    return await PostModel.find({_id: {$gt: lastPostId}})
    .then(post => ({
      isNewPost: Boolean(post.length),
      postList: post
    }))
    .catch(err => err);
  }

  categories = async () => {
    return await PostModel.find().distinct('category')
    .catch(err => err);
  }
}

export default new Resolvers();