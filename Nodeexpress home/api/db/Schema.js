const mongoose= require("mongoose");

const Api_create= new mongoose.Schema({
    First_name:{
        type:String,
    },
    Last_name:{
        type:String,
    },
    Gender:{
        type:String,
        ENUM:[`male`,`female`],
    },
    mo_no:{
        type:Number
    }
    
});

const Api_save= new mongoose.model("Api_save" ,Api_create);

module.exports=Api_save;