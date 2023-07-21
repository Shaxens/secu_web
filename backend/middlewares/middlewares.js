const jsonwebtoken = require("jsonwebtoken");
const userService = require("../services/user.service");
const authService = require("../services/auth.service");

exports.isUserLogged = async (req, res, next) => {
  if (req.headers?.authorization) {
    const [scheme, token] = req.headers.authorization.split(" ");
    if (token) {
      jsonwebtoken.verify(token, authService.JWT_SECRET, async (err, decode) => {
        if (err) {
          console.log(err)
          return res.status(401).json("NOT AUTHORIZED 1")
        } else {
          const userId = decode.data.userId;
          req.user = await userService.getUserById(userId);
          next();
        }
      })
    }
  } else {
    return res.status(401).json("NOT AUTHORIZED 2")
  }
}
