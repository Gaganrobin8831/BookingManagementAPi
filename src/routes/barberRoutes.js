const express = require('express');

const { HandleNewBarber, HandleBookingStatusUpdate} = require('../controller/barberController')
const barberrouter = express.Router(); 



barberrouter.route('/Barber').post(HandleNewBarber)
barberrouter.route('/BookingStatusUpdate').put(HandleBookingStatusUpdate)

module.exports = barberrouter;
