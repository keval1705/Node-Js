const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/data_employe",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
}).then(()=>{
    console.log("server connect");
}).catch((error)=>{
    console.log(error);
})

