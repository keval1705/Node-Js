const mongoose= require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/student",{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    family:4
}).then(()=>{
    console.log("connect this part");
}).catch((error)=>{
    console.log(error);
})