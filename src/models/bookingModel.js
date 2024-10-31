
const mongoose = require('mongoose');
const { validationErrorResponse } = require('../utils/response');
const BookingSchema = new mongoose.Schema({
    barberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barber',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    action: {
        type: String,
        enum: ["Accept", "Reject"],
        default: "Accept"
    }
}, { timestamps: true });


BookingSchema.pre('save', async function (next) {
    const overlappingBooking = await Booking.findOne({
        barberId: this.barberId,
        $or: [
            { startTime: { $lt: this.endTime, $gte: this.startTime } },
            { endTime: { $lte: this.endTime, $gt: this.startTime } }
        ]
    });
    if (overlappingBooking) {
        // return next(new Error('Time slot is already booked'));
        return validationErrorResponse(res,err,message,400)
    }
    next();
});
const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;

