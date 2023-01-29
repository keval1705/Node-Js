const mongoose =require("mongoose");


Add_contact_Schema= new mongoose .Schema({

    name:{
        type:String,
        require:true,
    }, 

    mo_no:{
        type:Number,
        require:true,
        // unique:true

    },

    user_id:{
        type:String,
    }
});

const Contact = new mongoose.model("Contact",Add_contact_Schema);

module.exports=Contact;