const barber = require("../models/barberModel");
const Management = require("../models/bookingModel");
const User = require("../models/userModels");
const {successResponse, errorResponse } = require("../utils/response");

async function Booking(req,res) {
    try {
        const { barberName, userName, startTime, endTime } = req.body;
    
      const barberDetail = await barber.findOne({FullName:barberName})
      const barberId = barberDetail._id

        const userdetail = await User.findOne({FullName:userName})
        const userId = userdetail._id

   
        const newBooking = new Booking({ barberId, userId, startTime, endTime });
        await newBooking.save();
        let message ='Booking successful'
        // res.status(201).json({ , booking: newBooking });
        return successResponse(res,newBooking,message,201)
      } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Server error' });
        return errorResponse(res,error,500)
      }
}


module.exports = {
    Booking
}