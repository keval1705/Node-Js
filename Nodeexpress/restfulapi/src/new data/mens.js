const express= require("express");

const mongoose=require("mongoose");

const menschema= new mongoose.Schema({
    ranking:{
        type:Number,
        unique:true,
        
    }   ,
    name:{
        type:String,
        unique:true,
        require:true,
    },
    dob:{
        type:String,
        require:true,
    },
    
    score:{
        type:Number,
        unique:true,
        require:true,
    },
    event:{
        type:Number,
        default:"100"
    },

})

const menranking= new mongoose.model("menrank",menschema)

module.exports= menranking;