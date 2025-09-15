const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const utilisateurSchema=mongoose.Schema({
    matricule:{
        type:String,
        required:true
    },
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
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
    mot_de_passe:{
        type:String,
        minlength:5,
        maxlength:1024,
        required:true
    },
},{timestamps:true});

utilisateurSchema.pre("save",async function(next){
   try{
        const saltRound=10;
        const salt=await bcrypt.genSalt(saltRound);
        this.mot_de_passe=await bcrypt.hash(this.mot_de_passe,salt);
        next();
   }
   catch(err){
        console.log(err);
        next(err);
   }
});

const Utilisateur=mongoose.model("utilisateurs",utilisateurSchema);
module.exports=Utilisateur;