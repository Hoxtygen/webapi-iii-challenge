const express = require('express');
const Model = require("./postDb.js");
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const posts = await Model.get();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            errorMessage: error
        })
    }
});

router.get('/:id', validatePostId, async(req, res) => {
    return res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, async(req, res) => {
   try {
       const post = await Model.remove(req.post);
       if (req.post) {
           console.log(post)
        return res.status(200).json({
            message: 'post successfully deleted'
        });
       } else {
        return res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
       }
   } catch (error) {
    res.status(500).json({
        error: "The post could not be removed"
    })
   }
});

/*router.put('/:id', async(req, res) => {
    const id = parseInt(req.params.id, 10);
    const { body } = req;
    try {
        const post = await Model.findById(id);
        if (post) {
            console.log(post)
            if(!body.text || !body.user_id) {
                return res.status(400).json({
                    status: 400,
                    errorMessage: "Please provide text and user_id for the post."
                })
            }
            const updatedPost = await Model.update(id, body);
            console.log(updatedPost)
            return res.status(200).json(updatedPost)
        } else {
            return res.status(404).json({
                status: 400,
                message: "The post with the specified ID does not exist."
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: "The post could not be modified."
        })
    }
});
*/
// custom middleware

async function validatePostId(req, res, next) {
    const id = req.params.id;
    if (Number.isNaN(id) || id % 1 !== 0 || id < 0) {
        return res.status(400).json({
            message: 'Invalid id supplied'
        })
    }
    try {
        const post = await Model.getById(id);
        if (!post) {
            return res.status(404).json({
                errorMessage: 'The post with the specified ID does not exist'
            })
        }
        req.post = post;
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
    return next()
};

module.exports = router;