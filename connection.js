
const mongoose=require("mongoose");


const Connection=async()=>{
   await mongoose.connect("mongodb://localhost:27017")

   console.log(`Connect With MongoDB Successfully`)
}
module.exports={Connection};