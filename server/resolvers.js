import PostModel from './model-post';
import UserModel from './model-user';

class Resolvers {
  postsByRecent = async ({ range }) => {
    range = range.split('-');

    if (range.length != 2) {
      new Error('range error');
    }

    range[0] = parseInt(range[0]);
    range[1] = parseInt(range[1])

    return await PostModel.find({})
      .sort('-timestamp').skip(range[0]).limit(range[1]).lean()
      .catch(err => new Error(err));
  }

  post = async ({ id }) => {
    return await PostModel.findById(id).lean()
    .catch(err => new Error(err))
  }
  
  createPost = async ({ title, body }, { session }) => {  
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
      title,
      body: {
        preview: omittedString,
        detail: body
      },
      timestamp: new Date(),
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

    await Model.findByIdAndUpdate(postId, {
      $push: {
        comments: {
          body,
          timestamp: new Date(),
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
}

export default new Resolvers();