const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

 mongoose.connect("mongodb://localhost:27017/contact_book",{

        useNewUrlParser:true,
        useUnifiedTopology:true,
        family:4

 }).then(()=>{
    console.log("server connect");
 }).catch((error)=>{
    console.log(error);
 });
