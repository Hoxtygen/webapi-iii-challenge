const express = require('express');
const usersModel = require('./userDb.js');
const router = express.Router();



router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', async(req, res) => {
    try {
        const users = await usersModel.get();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            errorMessage: error
        })
    }
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
