const mongoose=require("mongoose");
const gfuSchema=mongoose.Schema({
    numero:{
        type:String,
    },
    userActuel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Agent",
    },
  dateAffect: String,
  historique: [
    {
      user: String,
      site: String,
      dateAffect: String,
      dateReprise: String
    }
  ]
},{ timestamps: true })

const gfuModel=mongoose.model("Gfu",gfuSchema);
module.exports=gfuModel;