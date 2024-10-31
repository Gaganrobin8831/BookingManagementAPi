const express = require('express');
const path = require('path'); // Import the path module
const { HandleRegester, HandleLogin } = require('../controller/auth.controller');
const { checkAuth } = require('../middlewares/authentication');
const userrouter = express.Router(); 



userrouter.route('/regester').post(HandleRegester)


userrouter.route('/Login').post(HandleLogin)


userrouter.get('/:userId', checkAuth, async (req, res) => {
    const userId = req.params.userId;
    const loggedInUserId = req.user._id; 

    const messages = await Message.find({
        $or: [
            { To: userId, From: loggedInUserId },
            { To: loggedInUserId, From: userId }
        ]
    });

    res.json(messages);
});

module.exports = userrouter;
