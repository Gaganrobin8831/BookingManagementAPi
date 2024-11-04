const barber = require("../models/barberModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModels");
const { successResponse, validationErrorResponse } = require("../utils/response");

async function HandleNewBarber(req,res) {
      
    const {fullName ,email} = req.body
    console.log({fullName ,email})

    try {
          const checkBarber = await barber.findOne({ email });
          if (checkBarber) {
            let error = "you Already Have Account"
          let message = 'You already have an account.'
            return validationErrorResponse(res,error,message,409)

          }
  
          const ResgeterBarber = new barber({
            FullName: fullName,
            email,
           
        })

        await ResgeterBarber.save()
        return successResponse(res,ResgeterBarber,"Success",200)
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res,error,"Something Wrong",400)
        
    }

}



async function HandleBookingStatusUpdate(req, res) {
  const { user, barberName, status, day } = req.body;

  try {
    
    const userDetail = await User.findOne({ FullName: user });
    if (!userDetail) {
      return validationErrorResponse(res, "Enter Valid User Name", "User name is wrong");
    }
    const userId = userDetail._id;

 
    const barberDetail = await barber.findOne({ FullName: barberName });
    if (!barberDetail) {
      return validationErrorResponse(res, "Enter Valid Barber Name", "Barber Name is wrong");
    }
    const barberId = barberDetail._id;

   
    const bookings = await Booking.find({ barberId, userId, day });
    if (bookings.length === 0) {
      return validationErrorResponse(res, "Something Went Wrong", "User does not have any bookings with this barber on this day", 400);
    }

    let updatedBooking;
    for (const booking of bookings) {
      if (booking.action === "Pending") {
        booking.action = status;
        updatedBooking = await booking.save();
        break; 
      }
    }

    if (updatedBooking) {
      return successResponse(res, updatedBooking, "Booking status updated successfully", 200);
    } else {
      return validationErrorResponse(res, "Invalid Action", "No pending booking found to update or booking is in 'Reject' status", 400);
    }
  } catch (error) {
    console.error(error);
    return validationErrorResponse(res, error, "Something went wrong", 400);
  }
}
module.exports = {
    HandleNewBarber,
    HandleBookingStatusUpdate
}