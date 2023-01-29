const mongoose =require("mongoose");
// const express= require("express");
const bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken");

contactSchema= new mongoose.Schema({

    user_name:{
        require:true,
        type:String,
    },

    email:{
        type:String,
        require:true,
        unique:true,
    },

    password:{
        type:String,
        require:true,
    },

    image:[{
        image:{
            type:Array,
        },
    }],

    token:[{
        token:{
            type:String,
            require:true,

        }
    }]
});

//token//
contactSchema.methods.tokens=async function(){
    try {
        const token= jwt.sign({_id:this.id},"ashgshgadkjehgfgjhufhuwhfuh")
        this.token= this.token.concat({token});
        await this.save();
        return token;


    } catch (error) {
        console.log("error the part");
    }
}


// password hasing //

contactSchema.pre("save",async function(next){

    if (this.isModified("password")) {
        
        // console.log(`this currt ${this.password}`);
        this.password= await bcrypt.hash(this.password,10);
        // console.log(`this currt ${this.password}`);
        next();
    }
})

const contact_data= new mongoose.model("contact_data",contactSchema);

module.exports= contact_data;
