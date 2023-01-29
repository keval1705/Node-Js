const mongoose= require("mongoose");

 mongoose.connect("mongodb://localhost:27017/students-data",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    family:4
}).then(() =>{
    console.log("success");
}).catch((err) =>{
    console.log(err);
})
