const mongoose = require('mongoose');
const express = require('express');

 const Student_Schema= new mongoose.Schema({
    first_name:{
        type:String,

    },
    Last_name:{
        type:String,
    },

    infomation:{
        type:String,
    },

    Gender:{
        type:String,
        Enum:[`male`,`female`],
    },

    birthdate:{
        type:Date,
    },

    contact_no:{
        type:Number,
    },

    email:{
        type:String,
    }


 })

 const Student_data= new mongoose.model("Student_data",Student_Schema);

 module.exports = Student_data;