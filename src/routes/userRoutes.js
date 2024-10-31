const express = require('express');

const { HandleRegester, HandleLogin ,HandleBookingDelete} = require('../controller/userController');


const userrouter = express.Router(); 



userrouter.route('/regester').post(HandleRegester)


userrouter.route('/Login').post(HandleLogin)

userrouter.route('/deleteBooking').delete(HandleBookingDelete)


module.exports = userrouter;
