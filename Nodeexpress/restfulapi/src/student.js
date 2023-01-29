const mongoose=require("mongoose");

const validtor=require("validator");

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlenght:8,

    },

    email:{
        type:String,
        require:true,
        unique:[true,"Email id already present"],
        validtor(value){
            if (!validtor.isemail(value)) {
                    throw new error("invalid email");
            }
        }
    },

    mo_no:{
        type:Number,
        require:true,
        min:10,
        unique:true,


    },
    address:{
        type:String,
        require:true,

    }
});

const Student= new mongoose.model('Student', studentSchema);

module.exports=Student;