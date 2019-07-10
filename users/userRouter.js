const express = require('express');
const usersModel = require('./userDb.js');
const postModel = require('../posts/postDb')
const router = express.Router();



router.post('/', validateUser, async (req, res) => {
    const newUser = {
        name: req.body.name
    }
    console.log(newUser)
    try {
        const  newUserId = await usersModel.insert(newUser);
        const newUserData = await usersModel.getById(newUserId.id);
        return res.status(201).json(newUserData);
    } catch (error) {
        return res.status(500).json({
            error: 'There was an error while saving the user to the database',
        })
    }
});


router.post('/:id/posts', validateUserId, validatePost, async(req, res) => {
    const { text } = req.body;
  const newPost = {
    text,
    user_id: req.user.id,
  }
  try {
    const newPostId = await postModel.insert(newPost);
    const newPostData = await postModel.getById(newPostId.id);
    return res.status(201).json(newPostData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'There was an error while saving the post to the database',
    });
  }
});

router.get('/', async (req, res) => {
    try {
        const users = await usersModel.get();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            errorMessage: error
        })
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    res.status(200).send(req.user);
});

router.get('/:id/posts', validateUserId, async(req, res) => {
    try {
        const getPost = await usersModel.getUserPosts(req.user.id);
        //console.log(getPost)
        if (getPost.length) {
            return res.status(200).json({
                getPost
            })
        }
        return res.status(200).json({
            message: 'The user has no post to display'
        })
    } catch (error) {
        return res.status(500).json({
            error: 'There was an error while getting the posts from the database',
          });
      
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const user = await usersModel.remove(id);
        if (user) {
            return res.status(200).json({
                message: 'user successfully deleted'
            });
        } else {
            return res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "The user could not be removed"
        })
    }
});

router.put('/:id', (req, res) => {

});

//custom middleware

async function validateUserId(req, res, next) {
    const id = req.params.id;
    if (Number.isNaN(id) || id % 1 !== 0 || id < 0) {
        return res.status(400).json({
            errorMessage: "Invalid user id supplied"
        });
    }
    try {
        const user = await usersModel.getById(id);
        if (!id) {
            res.status(404).json({
                errorMessage: "The user with the specified ID does not exist."
            })
        }
        req.user = user;
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
    return next();
};

function validateUser(req, res, next) {
    if (!Object.keys(req.body).length) {
        return res.status(400).json({
            message: 'missing user data'
        })
    }
    if (!req.body.name) {
        return res.status(400).send({
          message: 'missing required name field',
        });
      }
      return next()

};

function validatePost(req, res, next) {
    if (!Object.keys(req.body).length) {
        return res.status(400).send({
          message: 'missing post data',
        });
      }
      if (!req.body.text) {
        return res.status(400).send({
          message: 'missing required text field',
        });
      }
      return next()
};

module.exports = router;
