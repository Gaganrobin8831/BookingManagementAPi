const barber = require("../models/barberModel");
const Booking= require("../models/bookingModel");
const User = require("../models/userModels");
const {successResponse, errorResponse, validationErrorResponse } = require("../utils/response");



function convertTo24Hour(time) {
  const [timePart, period] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

async function BookingForBarber(req,res) {
    try {
        const { barberName, userName, startTime, endTime } = req.body;
    
      const barberDetail = await barber.findOne({FullName:barberName})
      if (!barberDetail) {
          let error = "Something Went Wrong"
          let message = 'You Provide Wrong Barber Name'
        return validationErrorResponse(res,error,message,409)
      }
      const barberId = barberDetail._id


        const userdetail = await User.findOne({FullName:userName})
        console.log(userdetail);
        if (!userdetail) {
          let error = "Something Went Wrong"
          let message = 'You Provide Wrong User Name'
        return validationErrorResponse(res,error,message,409)
      }

        const userId = userdetail._id


        const formattedStartTime = convertTo24Hour(startTime);
        const formattedEndTime = convertTo24Hour(endTime);
       console.log({formattedStartTime,formattedEndTime});
       
        const businessStart = "09:00";
        const businessEnd = "17:00";
     
        if (formattedStartTime < businessStart || formattedEndTime > businessEnd) {
            let error = "Something Went Wrong"
            return validationErrorResponse(res,error,'Bookings must be within business hours (9:00 AM to 5:00 PM)',409)
          }
     
        const BookingDetail = await Booking.findOne({barberId});

        const overlappingBooking = await Booking.findOne({
          barberId,
          $or: [
              {
                  $and: [
                      { startTime: { $lt: formattedEndTime } },
                      { endTime: { $gt: formattedStartTime } }
                  ]
              }
          ]
      });
      if (overlappingBooking) {
        let error = "Choose Another Slot"
        return validationErrorResponse(res,error,'Bookings Slot Already Booked',400)
      }
   
        const newBooking = new Booking(
          { barberId,
             userId, 
             startTime:formattedStartTime, 
             endTime:formattedEndTime });
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
    BookingForBarber 
}