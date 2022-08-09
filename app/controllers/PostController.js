import Post from '../models/Post.js';

// get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Posts not found...',
    });
  }
};
// Get post by ID
export const getPost = async (req, res) => {
  try {
    Post.findOneAndUpdate(
      {
        _id: req.params.id,
      }, {
        $inc: { viewsCount: 1 },
      }, {
        returnDocument: 'after',
      }, (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Post wrong...',
          });
        } else {
          return doc ? res.json(doc) : res.status(404).json({ message: 'Post not found...'});
        }
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Post wrong...',
    });
  }
};
// Create post
export const create = async (req, res) => {
  try {
    const doc = new Post({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Create wrong...',
    });
  }
};
// Delete post
export const remove = async (req, res) => {
  try {
    Post.findOneAndDelete(
      {
        _id: req.params.id,
      }, (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Delete wrong...',
          });
        }
        return doc ? res.json({ success: true }) : res.status(404).json({ message: 'Post not deleted...' });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Post wrong...',
    });
  }
};
// Update post
export const update = async (req, res) => {
  try {
    await Post.updateOne({
      _id: req.params.id,
    }, {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Update wrong...',
    });
  }
};