const { create } = require("hbs");
const mongoose= require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const data_employe_Schema= new mongoose.Schema({

    username:{
        type:String,
        require:true,
    },

    email:{
        type:String,
        require:true,
        unique:true,
    },

    password : {
        type:String,
        require:true,
    },
    token:[{
        token:{
            type:String,
            require:true,
        }
    }]
});

//token//

data_employe_Schema.methods.tokens= async function(){

    try {
        console.log(this._id);
        const token =jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.token=this.token.concat({token});
        await this.save();
        return token;
        
    } catch (error) {
        console.log();("error the part");
    }
        
}


// password //

data_employe_Schema.pre("save",async function (next) {

    if (this.isModified("password")) {
        
        // console.log(`curt password ${this.password}`);
         // const passwordhash= await bcrypt.hash(password,10);
        this.password= await bcrypt.hash(this.password,10);
        // console.log(`curt password ${this.password}`);

    }
    next();
    
})



const data_employe= new mongoose .model("data_employe",data_employe_Schema);

module.exports = data_employe;