let jwt = require("jsonwebtoken");
let checkToken = async (req, res, next) => {
  try {
    
    if(req.headers.authorization == undefined){
      return ReE(res,{message: "You are not authorized to access this resource"},401)
    }
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token> Express headers are auto converted to lowercase
    if (!token) {
      return ReE(res,{message: "You are not authorized to access this resource"},401)
    }
    
    let decoded = jwt.verify(token, process.env.LOGIN_SECRETE);
    req.decoded = decoded;
    next();
  } catch (err) {
    return ReE(res,{message: err.message},401)
  }
};


module.exports = checkToken 