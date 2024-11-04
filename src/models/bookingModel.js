const mongoose = require('mongoose');

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
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    action: {
        type: String,
        enum: ["Accept", "Reject","Pending"],
        default: "Pending"
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true
    
    }
}, { timestamps: true });


const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;

