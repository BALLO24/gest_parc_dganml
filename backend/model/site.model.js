const mongoose=require("mongoose");
const siteSchema=mongoose.Schema({
    nom:{
        type:String,
        unique:true,
    },
    typeSite:{
        type:String,
        enum:["siège","station","aéorodrome"],
        required:true,
    }
},{ timestamps: true })

const siteModel=mongoose.model("Site",siteSchema);
module.exports=siteModel;