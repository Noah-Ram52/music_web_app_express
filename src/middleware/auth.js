const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/coolcode");
const { UNAUTHORIZED_ERROR_CODE } = require("../utils/errorCodes");  // 401


module.exports = (req, res, next) => {
  // Get token from Authorization header
  const { authorization } = req.headers;
  
  // ❌ NO TOKEN = 401
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: "Authorization Required" });
  }
  
  const token = authorization.replace("Bearer ", "");
  
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // ❌ INVALID TOKEN = 401
    return res.status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: "Invalid Token" });
  }
  
  // ✅ Attach user to req
  req.user = payload;
  return next();
};
