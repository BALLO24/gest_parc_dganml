const mongoose=require("mongoose");
const agentSchema=mongoose.Schema({
    matricule:{
        type:String,
        required:true,
        unique:true,
    },
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
       
    site:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Site",
        required:true,
    },

    telephone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
},{timestamps:true});


const Agent=mongoose.model("Agent",agentSchema);
module.exports=Agent;