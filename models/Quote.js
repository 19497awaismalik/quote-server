const {Schema, default: mongoose}=require("mongoose")

const QuoteSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
   
},{timestamps:true});


const Quote=mongoose.model("quote",QuoteSchema);
module.exports={Quote};