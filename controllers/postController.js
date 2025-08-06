import Post from '../models/post.js';

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file?.path || '';

    const post = await Post.create({
      author: req.user._id,
      content,
      image,
    });

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name profileImage')
      .populate('comments.user', 'name profileImage');

    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name profileImage')
      .populate('comments.user', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .populate('author', 'name profileImage')
      .populate('comments.user', 'name profileImage')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'name profileImage')
      .populate('comments.user', 'name profileImage')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name profileImage')
      .populate('comments.user', 'name profileImage');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user._id;

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('author', 'name profileImage')
      .populate('comments.user', 'name profileImage');

    res.json({ 
      message: isLiked ? 'Post unliked' : 'Post liked',
      post: updatedPost,
      isLiked: !isLiked
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      user: req.user._id,
      text: req.body.text,
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const { commentId, text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (!comment.user.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized to edit this comment' });

    comment.text = text;
    await post.save();

    res.json({ message: 'Comment updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (!comment.user.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized to delete this comment' });

    post.comments.pull(commentId);
    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('author', 'name profileImage')
      .populate('comments.user', 'name profileImage');

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
