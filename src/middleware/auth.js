const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/coolcode");
const UnauthorizedRequestError = require("../HTTP Response/Errors/UnauthorizedError");  // 401


module.exports = (req, res, next) => {
  // Get token from Authorization header
  const { authorization } = req.headers;
  
  // ❌ NO TOKEN = 401
  if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new UnauthorizedRequestError("Authorization Required"));
  }
  
  const token = authorization.replace("Bearer ", "");
  
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // ❌ INVALID TOKEN = 401
      return next(new UnauthorizedRequestError("Invalid Token"));
  }
  
  // ✅ Attach user to req
  req.user = payload;
  return next();
};
