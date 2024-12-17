const { userModel, themeModel, postModel } = require('../models');

function newPost(text, userId, themeId) {
    return postModel.create({ text, userId, themeId })
        .then(post => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { posts: post._id }, $addToSet: { themes: themeId } }),
                themeModel.findByIdAndUpdate({ _id: themeId }, { $push: { posts: post._id }, $addToSet: { subscribers: userId } }, { new: true })
            ]);
        });
}

function getAllPosts(req, res, next) {
    postModel.find()
        .sort({ created_at: -1 })  
        .populate('themeId userId')
        .then(posts => res.status(200).json(posts))
        .catch(next);
}

function createPost(req, res, next) {
    const { themeId } = req.body;  
    const { _id: userId } = req.user;  
    const { text: postText } = req.body; 

    if (!req.user) {
        return res.status(400).json({ message: 'User is not authenticated.' });
    }

    if (!postText) {
        return res.status(400).json({ message: 'Text is required for the post.' });
    }

   
    const newPost = new postModel({ text: postText, userId, themeId });

    newPost.save()
        .then(post => {
            
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { posts: post._id } }),
                themeModel.findByIdAndUpdate(
                    themeId,
                    { $push: { posts: post._id } },
                    { new: true }
                )
            ]);
        })
        .then(([_, updatedTheme]) => {
            
            res.status(200).json(updatedTheme);
        })
        .catch(next);  
}


function getPostById(req, res, next) {
    const { id } = req.params;

    postModel.findById(id)
        .populate('userId', 'username')
        .populate('themeId', 'name')
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(post);
        })
        .catch(next);
}

function getLatestsPosts(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    postModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('themeId', 'name') // Попълни само нужното поле
        .populate('userId', 'username')
        .then(posts => res.status(200).json(posts))
        .catch(next);
}

function editPost(req, res, next) {
    const { postId } = req.params;
    const { postText } = req.body;
    const { _id: userId } = req.user;

    postModel.findOneAndUpdate({ _id: postId, userId }, { text: postText }, { new: true })
        .then(updatedPost => {
            if (updatedPost) {
                res.status(200).json(updatedPost);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deletePost(req, res, next) {
    const { postId, themeId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        postModel.findOneAndDelete({ _id: postId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
        themeModel.findOneAndUpdate({ _id: themeId }, { $pull: { posts: postId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { postId } = req.params;
    const { _id: userId } = req.user;

    postModel.updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successfully!' }))
        .catch(next);
}

function getPost(req, res, next) {
    const { id } = req.params;

    postModel.findById(id)
      .populate('userId')
      .populate('comments.userId')  // Попълни с информация за потребителите на коментарите
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'Post not found' });
        }
      })
      .catch(next);
}

function addComment(req, res, next) {
    const { id } = req.params;
    const { text } = req.body;

    postModel.findById(id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }

        // Добави новия коментар
        post.comments.push({ text, userId: req.user._id });
        return post.save();
      })
      .then(updatedPost => res.status(200).json(updatedPost))  // Върни актуализираната публикация
      .catch(next);
}

function getComments(req, res, next) {
    const { postId } = req.params;

    postModel.findById(postId)
        .populate('comments.userId', 'username') // Попълване на данните за потребителя на коментара
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(post.comments);
        })
        .catch(next);
}


module.exports = {
    getLatestsPosts,
    newPost,
    createPost,
    getAllPosts,
    getPostById,
    editPost,
    deletePost,
    like,
    addComment,
    getPost,
    getComments,
    
};
