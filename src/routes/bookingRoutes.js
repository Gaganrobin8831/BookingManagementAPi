const express = require('express');

const { BookingForBarber } = require('../controller/bookingController');
const { checkAuth } = require('../config/auth');
const Bookingrouter = express.Router(); 



Bookingrouter.route('/Booking').post(checkAuth,BookingForBarber)

module.exports = Bookingrouter;
