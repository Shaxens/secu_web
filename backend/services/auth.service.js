const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const userService = require("./user.service");

const SALT_ROUNDS = 10;

const JWT_SECRET = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
exports.JWT_SECRET = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function hashPassword(plainTextPassword) {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS)
}

function comparePassword(plainTextPassword, hash) {
  return bcrypt.compare(plainTextPassword, hash)
}

function createToken(data) {
  return jsonwebtoken.sign({ data }, JWT_SECRET, {
    expiresIn: "1d"
  });
}

exports.signIn = async (username, password) => {
  const dbUser = await userService.getUserByUsername(username);
  const dbPassword = await comparePassword(password, dbUser.password)

  if (dbPassword) {
    const user = {
      username: dbUser.username,
      uuid: dbUser.uuid
    }

    return createToken(user)
  } else {
    console.error("ERROR SIGNING IN :: Cannot create the token")
  }
}

exports.signUp = async (username, password, firstname, lastname) => {
  return userService.createUser({ username, password: await hashPassword(password), firstname, lastname });
};