
const mongoose=require("mongoose");


const Connection=async()=>{
   await mongoose.connect("mongodb+srv://19497awaismalik:awaismalik@cluster0.naygr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

   console.log(`Connect With MongoDB Successfully`)
}
module.exports={Connection};
