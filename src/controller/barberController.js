const barber = require("../models/barberModel");
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
module.exports = {
    HandleNewBarber
}