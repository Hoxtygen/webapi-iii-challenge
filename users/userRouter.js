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

router.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const user = await usersModel.getById(id);
        if (user) {
            return res.status(200).json({
                user
            });
        } else {
            return res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    } catch (error) {
        res.status(500).json({
            errorMessage: error
        })
    }
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', async(req, res) => {
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

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
