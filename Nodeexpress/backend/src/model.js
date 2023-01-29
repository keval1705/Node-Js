const mongoose = require("mongoose");

const usercreateschema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        
        
    },
    mo_no:{
        type:Number,
        require:true,
    },



});

const usercreate= new mongoose.model("usercrete",usercreateschema);

module.exports = usercreate;