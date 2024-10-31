const express = require('express');

const { HandleNewBarber} = require('../controller/barberController')
const barberrouter = express.Router(); 



barberrouter.route('/Barber').post(HandleNewBarber)

module.exports = barberrouter;
