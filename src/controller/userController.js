const User = require('../models/userModels')
const bcrypt = require('bcrypt')
const path = require('path');
const { createTokenUser } = require('../middleware/validate');
const { validationErrorResponse, successResponse } = require('../utils/response');
const barber = require('../models/barberModel');
const Booking = require('../models/bookingModel');

async function HandleRegester(req, res) {


    const { fullName, email, password } = req.body
    console.log({ fullName, email, password })

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            let error = "Already Regester"
            let message = 'You already have an account. Please login'
            //   return res.render('login', { message: 'You already have an account. Please login.' });
            return validationErrorResponse(res, error, message, 409)

        }

        const hasPasword = await bcrypt.hash(password, 10);
        const ResgeterUser = new User({
            FullName: fullName,
            email,
            password: hasPasword
        })
        await ResgeterUser.save()
        return successResponse(res, ResgeterUser, "Success", 200)
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res, error, "Something Wrong", 400)

    }

}


async function HandleLogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return validationErrorResponse(res, error, 'Invalid email or password', 400)
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return validationErrorResponse(res, error, 'Invalid email or password', 400)
        }


        const token = createTokenUser(user);


        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        let data = {
            email,
            password
        }
        return successResponse(res, data, "Login Success", 200)
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res, error, "Something Wrong", 400)
    }
}



async function HandleBookingDelete(req, res) {
    const { userName, barberName } = req.body

    try {
        const barberDetail = await barber.findOne({ FullName: barberName })
        if (!barberDetail) {
            let error = "Something Went Wrong"
            let message = 'You Provide Wrong Barber Name'
            return validationErrorResponse(res, error, message, 409)
        }
        const barberId = barberDetail._id


        const userdetail = await User.findOne({ FullName: userName })
        // console.log(userdetail);
        const userId = userdetail._id
        if (!userdetail) {
            let error = "Something Went Wrong"
            let message = 'You Provide Wrong User Name'
            return validationErrorResponse(res, error, message, 409)
        }

        const booking = await Booking.findOne({ barberId: barberId, userId: userId });
        console.log(booking);
        
        if (!booking) {
            let error = "Something Went Wrong"
            let message = 'You have Not Booking'
            return validationErrorResponse(res, error, message, 409)
        }
        let bookingId = booking._id
        await Booking.findByIdAndDelete({ _id: bookingId })
        return successResponse(res, booking, "Delete Successfully", 200)
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res, error, "Something Wrong", 400)
    }

}
module.exports = {
    HandleRegester,
    HandleLogin,
    HandleBookingDelete
}