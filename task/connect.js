const mongoose= require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/Task",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family:4
}).then(()=>{
    console.log("success this network");
}).catch((error)=>{
    console.log(error);
})