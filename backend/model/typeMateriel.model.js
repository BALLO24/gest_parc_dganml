const mongoose=require("mongoose");
const typeMaterielSchema=mongoose.Schema({
    nom:{
        type:String,
        unique:true,
    },
},{ timestamps: true })

const typeMaterielModel=mongoose.model("typeMateriel",typeMaterielSchema);
module.exports=typeMaterielModel;