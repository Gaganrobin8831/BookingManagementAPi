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


async function HandleBookingStatusUpdate(req,res) {
  const {user,barberName,status,day} = req.body
  try {
    const userDetail = await User.findOne({FullName:user})
    

    if (!userDetail) {
      return validationErrorResponse(res,"Enter Valid User Name ","User name is wrong")
    }

    const userId = userDetail._id

    const baraberDetail = await barber.findOne({FullName:barberName})
    if (!baraberDetail) {
      return validationErrorResponse(res,"Enter Valid Barber Name ","Barber Name is wrong")
    }
    const barberId = baraberDetail._id

    const checkBooking = await Booking.findOne({barberId,userId,day})
    console.log(checkBooking);
    if (!checkBooking) {
      return validationErrorResponse(res,"Something Went Wrong","You have not booking With This Barber on this day",400)
    }
    
      checkBooking.action = status

      await checkBooking.save()
    return successResponse(res,checkBooking,"Success",200)
  } catch (error) {
    console.log(error);
    return validationErrorResponse(res,error,"Something Wrong",400)
  }
}
module.exports = {
    HandleNewBarber,
    HandleBookingStatusUpdate
}