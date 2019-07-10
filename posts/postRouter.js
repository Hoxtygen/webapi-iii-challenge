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

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;