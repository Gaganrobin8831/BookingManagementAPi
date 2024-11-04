const barber = require("../models/barberModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModels");
const { successResponse, errorResponse, validationErrorResponse } = require("../utils/response");



function convertTo24Hour(time) {
  const [timePart, period] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

async function BookingForBarber(req, res) {
  try {
    const { barberName, userName, startTime, endTime, day } = req.body;
    console.log(day);
    
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (!validDays.includes(day)) {
      return validationErrorResponse(res, "Invalid Day", 'Bookings can only be made from Monday to Saturday', 409);
    }
    const barberDetail = await barber.findOne({ FullName: barberName });
    if (!barberDetail) {
      return validationErrorResponse(res, "Something Went Wrong", 'You Provided Wrong Barber Name', 409);
    }
    const barberId = barberDetail._id;
    const userDetail = await User.findOne({ FullName: userName });
    if (!userDetail) {
      return validationErrorResponse(res, "Something Went Wrong", 'You Provided Wrong User Name', 409);
    }
    const userId = userDetail._id;
    const formattedStartTime = convertTo24Hour(startTime);
    const formattedEndTime = convertTo24Hour(endTime);
    const businessStart = "09:00";
    const businessEnd = "17:00";
    if (formattedStartTime < businessStart || formattedEndTime > businessEnd) {
      return validationErrorResponse(res, "Something Went Wrong", 'Bookings must be within business hours (9:00 AM to 5:00 PM)', 409);
    }

    const overlappingBooking = await Booking.findOne({
      barberId,
      day,
      action:{$in:["Accept","Pending"]},
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
      return validationErrorResponse(res, "Choose Another Slot", 'Booking Slot Already Booked for the given day', 400);
    }

    const newBooking = new Booking({
      barberId,
      userId,
      day,
      startTime: formattedStartTime,
      endTime: formattedEndTime
    });
    await newBooking.save();
    return successResponse(res, newBooking, 'Booking successful', 201);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, 500);
  }
}

module.exports = {
  BookingForBarber
}