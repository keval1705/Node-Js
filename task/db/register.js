const mongoose =require("mongoose");
const bcrypt= require("bcryptjs");

const Register_Schema= new mongoose.Schema({
    Email:{
        type:String,
    },

    Password:{
        type:String,
    },

    Count:{
        type:Number,
        default:1
    },
    token:{
        type:String
    }
});



    Register_Schema.pre("save",async function(next){
    this.Password= await bcrypt.hash(this.Password,10);

    next();
});

const Register_data= new mongoose.model("Register_data",Register_Schema);

module.exports=Register_data;