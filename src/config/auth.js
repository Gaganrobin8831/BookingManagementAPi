const { validateToken } = require('../services/authentication.sevice');

function checkAuth(req, res, next) {
  const token = req.cookies.authToken; 
  if (!token) {
      return res.redirect('/Login'); 
  }

  try {
      const userPayload = validateToken(token); 
      req.user = userPayload; 
      next(); 
  } catch (error) {
      console.log('Invalid token:', error.message);
      return res.redirect('/Login');
  }
}


module.exports = {
  checkAuth,
};
