
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/users",{
    
    
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4,

}).then(()=>{
    console.log("server connect");
})
.catch((err)=>{
    console.log(err);
});


const adminSchema= new mongoose.Schema({
    name:{
        type:String,
        require: true,
        unique:true,
        lowercase:true,
    },
     email:{
        typr:String,
        // require : true,
        // email : true,
     },
     mo_no:{
        type:Number,
        require:true,
     },
     is_admin:{
        type:Boolean,
     }

    });
     const admin= mongoose.model("admin",adminSchema);
    //  console.log(admin);
    const document=async () =>{

        
        const insertData1= new admin({
            name:"keval",
            email:"keval@gmail.com",
            mo_no:909090909,
            
        })
        
        const insertData2= new admin({
            name:"abc",
            email:"keval@gmail.com",
            mo_no:909090909,
            
        })
        
        const insertData3= new admin({
            name:"xyz",
            email:"keval@gmail.com",
            mo_no:909090909,
            
        })
        
        const insertData4= new admin({
            name:"pqr",
            email:"keval@gmail.com",
            mo_no:909090909,
            
        })
        
        const insertData5= new admin({
            name:"asd",
            email:"keval@gmail.com",
            mo_no:909090909,
            
        })
        
        // const result= await admin.insertMany([insertData1,insertData2,insertData3,insertData4,insertData5]);
        
        // //
        
        const find=await admin.find()
                            .sort({name: -1})
                            // .count();
        console.log(find);
    }
    document();
    
    const deletedate = async(_id)=>{

        const del= await admin.deleteOne({_id})
        console.log(del);
    }
    deletedate("6385d8aa969dbd870acdebc3");