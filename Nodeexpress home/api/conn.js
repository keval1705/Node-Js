const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/api",{

        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family:4

}).then(()=>{
    console.log("success this network");
}).catch((error)=>{
    console.log(error);
});