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

router.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const post = await Model.getById(id);
        if (post) {
            return res.status(200).json({
                post
            });
        } else {
            return res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    } catch (error) {
        res.status(500).json({
            errorMessage: error
        })
    }
});

router.delete('/:id', async(req, res) => {
   const id = parseInt(req.params.id, 10);
   try {
       const post = await Model.remove(id);
       if (post) {
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

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;