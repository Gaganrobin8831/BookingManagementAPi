const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  }
},{timestamps:true});

const barber = mongoose.model('barber', barberSchema);
module.exports = barber;
