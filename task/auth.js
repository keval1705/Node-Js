const jwt = require("jsonwebtoken");
const Register_data = require("./db/register");

const auth = async(req,res) =>{
    const header = req.headers.authorization
    const token = header.split(' ')[1]

    var decoded = await jwt.verify(token, 'simplekey12345678901234567890');
    const a = await Register_data.findOne({ token });

    if(String(a?._id) !== String(decoded.user_id)){
        return  res.send("token invalid")
    }
    else{
        return decoded.user_id
    }

}
module.exports = auth