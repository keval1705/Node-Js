const jwt = require("jsonwebtoken");

const token = (userId)=> jwt.sign({user_id:userId},"simplekey12345678901234567890");


module.exports = token