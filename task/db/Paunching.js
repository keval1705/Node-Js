const { timers } = require("jquery");
const mongoose = require("mongoose");

const Paunch_Schema= new mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"register_datas"
    },

    Paunch_in:{
      type:String,
    }, 

    Paunch_out:{
     type:String,

    },
})

const Paunching = new mongoose.model("Paunching",Paunch_Schema);

module.exports=Paunching;

