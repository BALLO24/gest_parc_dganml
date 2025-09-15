const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/gest_parc_dganml")
    .then(()=>console.log("Mongodb connexion ok !"))
    .catch(()=>console.log("Probleme de connexion au Mongodb"))

module.exports={mongoose}