const User = require('../models/userModels')
const bcrypt = require('bcrypt')
const path = require('path'); 
const { createTokenUser } = require('../middleware/validate');
const { validationErrorResponse, successResponse } = require('../utils/response');

async function HandleRegester(req,res) {
    
    
    const {fullName ,email,password} = req.body
    console.log({fullName ,email,password})

    try {
          const checkUser = await User.findOne({ email });
          if (checkUser) {
            let error = "Already Regester"
          let message = 'You already have an account. Please login'
            //   return res.render('login', { message: 'You already have an account. Please login.' });
            return validationErrorResponse(res,error,message,409)

          }
  
        const hasPasword = await bcrypt.hash(password,10) ;
        const ResgeterUser = new User({
            FullName: fullName,
            email,
            password:hasPasword
        })
        await ResgeterUser.save()
        return successResponse(res,ResgeterUser,"Success",200)
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res,error,"Something Wrong",400)
        
    }

}


async function HandleLogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return validationErrorResponse(res,error,'Invalid email or password',400)
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return validationErrorResponse(res,error,'Invalid email or password',400)
        }

      
        const token = createTokenUser(user);

       
        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); 

        return successResponse(res,ResgeterUser,"Login Success",200)
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res,error,"Something Wrong",400)
    }
}

module.exports = {
    HandleRegester,
    HandleLogin
}