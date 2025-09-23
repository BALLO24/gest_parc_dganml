const gfuModel=require("../model/gfu.model");
const Agent =require("../model/agent.model");
const sendMail=require("../function/sendMail");
module.exports.addNumGfu=async(req,res)=>{
    try{
        const data=req.body;
        const infoGfu=await new gfuModel(data);
        await infoGfu.save();
        res.status(201).json(data)
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
};

module.exports.getAllNumGfu=async(req,res)=>{
    try{
        const numsGfu=await gfuModel.find().populate({
            path:"userActuel",
            select:"matricule nom prenom",
            populate:{
                path:"site",
                select:"nom"
            }
        }).sort({createdAt:-1});
        
        res.status(200).json({numsGfu,message:"Numéros recupérés avec succès !"})
        
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
};

module.exports.deleteNumGfu=async (req,res)=>{
    try{
       const {idToDelete}=req.params;
      const deleted = await gfuModel.findByIdAndDelete(idToDelete);
      if(!deleted){
        return res.status(404).json({ message: "Numéro GFU non trouvé" }); }
         else{
        return res.status(200).json({ message: "Numéro GFU supprimé avec succès" });
    }
    }
   
    catch(err){
        console.log(err);
    }
}

module.exports.reaffectGfu=async(req,res)=>{
    //console.log("Reaffectaion Gfu");
    
    const {idGfu}=req.params;
    const {nouvelUtilisateur}=req.body;
  //Trouver les info du nouveau user pour l'envoi de mail
  const newUser=await Agent.findById(nouvelUtilisateur);


    const gfu = await gfuModel.findById(idGfu).populate({
        "path":"userActuel",
        "select":"nom prenom matricule",
        populate:{
            "path":"site",
            "select":"nom"
        }
    });
    gfu.historique.push({
        user: `${gfu.userActuel.nom} ${gfu.userActuel.prenom}`,
        // site: materiel.userActuel.site?.toString() || ""
        site: gfu.userActuel.site.nom,
        dateAffect:gfu.dateAffect,
        dateReprise:new Date().toLocaleDateString("fr-FR"),
      });
      //Recuperer les info de l'ancien user
      const lastUserPrenom=gfu.userActuel.prenom
      const lastUserNom=gfu.userActuel.nom
      const lastUserMatricule=gfu.userActuel.matricule

      gfu.userActuel = nouvelUtilisateur;
      gfu.dateAffect=new Date().toLocaleDateString("fr-FR");
      await gfu.save();
const message = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: #2c7be5;
      text-align: center;
      padding: 20px;
    }
    .header img {
      max-height: 60px;
      display: block;
      margin: auto;
    }
    .content {
      padding: 20px;
      font-size: 16px;
      color: #333;
      line-height: 1.6;
    }
    .highlight {
      font-weight: bold;
      color: #2c7be5;
    }
    .success {
      font-weight: bold;
      color: #28a745;
    }
    .danger {
      font-weight: bold;
      color: #d9534f;
    }
    .footer {
      background: #f4f6f8;
      text-align: center;
      font-size: 12px;
      color: #777;
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header avec logo -->
    <div class="header">
      <img src="cid:logoasecna" alt="Logo ASECNA" />
    </div>

    <!-- Contenu -->
    <div class="content">
      <p>Bonjour,</p>
      <p>
        Le numéro de téléphone GFU <span class="highlight">${gfu.numero}</span>  
        qui appartenait à <span class="highlight">${lastUserPrenom} ${lastUserNom}</span> 
        (matricule : <span class="highlight">${lastUserMatricule}</span>) 
        vient d'être <span class="success">réaffecté</span> à l'agent 
        <span class="highlight">${newUser.prenom} ${newUser.nom}</span> 
        (matricule : <span class="highlight">${newUser.matricule}</span>).
      </p>
      <p><strong>Date :</strong> ${new Date().toLocaleDateString("fr-FR")}</p>
      <p>
        Si vous pensez qu'il s'agit d'une erreur, merci de contacter immédiatement l’administrateur.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      &copy; ${new Date().getFullYear()} Délégation ASECNA MALI. Tous droits réservés.
    </div>
  </div>
</body>
</html>
`;

      const objet="Réaffection de numéro GFU";
      const destinataire="abdoulwahabballo24@gmail.com";
      await sendMail(objet,message,destinataire);


    res.status(200).json({
      message: "Numéro GFU réaffecté avec succès !",
      gfu
    });
}
