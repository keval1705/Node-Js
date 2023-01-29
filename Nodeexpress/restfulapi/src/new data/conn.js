const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/olymics",{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    family:4
}).then(()=>{
    console.log("success");
}).catch((error)=>{
    console.log(error);
})