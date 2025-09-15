const {Materiel,Ordinateur,Copieur,Imprimante,Onduleur,Routeur,Switch,Controleur,Projecteur}=require("../model/materiel.model");
//const Utilisateur=require("../model/utilisateur.model")
const Agent =require("../model/agent.model")
const sendMail=require("../function/sendMail");
const mongoose=require("mongoose")
module.exports.getAllMateriels=async(req,res)=>{
    try{
        const materiels=await Materiel.find().populate({
            path:"userActuel",
            select:"matricule nom prenom",
            populate:{
                path:"site",
                select:"nom"
            }
        });
        res.status(200).json({materiels,message:"Materiels recupérés avec succès"})
        
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}

module.exports.addMateriel=async(req,res)=>{
    try {
        const {type,historique,...data}=req.body;
        switch(type){
            case "ordinateur":
                const ordinateur=new Ordinateur({...data});
                await ordinateur.save();
                break;
            case "copieur":
                const copieur=new Copieur(data)
                await copieur.save();
                break
            case "imprimante":
                const imprimante=new Imprimante(data)
                await imprimante.save();                
                break;
            case "onduleur":
                const onduleur=new Onduleur(data)
                await onduleur.save();                
                break;
            case "routeur":
                const routeur=new Routeur(data)
                await routeur.save();                
                break;
            case "switch":
                const switchs=new Switch(data) //le mot switch n'est pas autorisé en tant que var js
                await switchs.save();                
                break;
            case "controleur":
                const controleur=new Controleur(data)
                await controleur.save();                
                break;
            case "projecteur":
                const projecteur=new Projecteur(data)
                await projecteur.save();                
                break;


        }
        res.status(201).send(`${type} est crée avec succès`)
        
        
    }
    
    catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.deleteMateriel=async (req,res)=>{
    try{
       const {idToDelete}=req.params;
       console.log(idToDelete);
      const deletedMateriel = await Materiel.findByIdAndDelete(idToDelete);
      if(!deletedMateriel){
        return res.status(404).json({ message: "Materiel non trouvé" }); }
         else{
          console.log("delted",deletedMateriel);
          
          const idUser=deletedMateriel.userActuel;
          console.log("idUser",idUser);
          
          const lastUser=await Agent.findById(idUser);
          console.log("user actuel",lastUser);
          
          //const message=`L'équipement ${deletedMateriel.__t} de No Série ${deletedMateriel.noSerie} appartenant à ${lastUser.prenom} ${lastUser.nom} de matricule ${lastUser.matricule} vient d'être supprimé de la base.`
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
        L'équipement <span class="highlight">${deletedMateriel.__t}</span> 
        de Numéro de Série <span class="highlight">${deletedMateriel.noSerie}</span> 
        appartenant à <span class="highlight">${lastUser.prenom} ${lastUser.nom}</span> 
        (matricule : <span class="highlight">${lastUser.matricule}</span>) 
        vient d'être <span class="danger">supprimé</span> de la base de données.
      </p>
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

  const objet="Suppression d'équipement ";
  const destinataire="abdoulwahabballo24@gmail.com"        
          
          await sendMail(objet,message,destinataire)
          
        return res.status(200).json({ message: "Materiel supprimé avec succès" });
    }
    }
   
    catch(err){
        console.log(err);
    }
}

module.exports.modifMateriel=async (req,res)=>{
    try{
        const {idToModif}=req.params;
        const updates=req.body;
    //     console.log("primary data",updates);
                
    //     const updatedMateriel = await Materiel.findByIdAndUpdate(
    //   idToModif,
    //   { $set: updates },
    //   { new: true, runValidators: true } // new = retourne l'objet mis à jour
    // );

    const doc = await Materiel.findById(idToModif);
    if (!doc) return res.status(404).json({ message: "Materiel non trouvé" });

// Trouver le bon modèle
const Model = mongoose.model(doc.__t);  // ex: "Imprimante", "Ordinateur"...

const updatedMateriel = await Model.findByIdAndUpdate(
  idToModif,
  { $set: updates },
  { new: true, runValidators: true }
);
console.log("second data",updatedMateriel);
    if (!updatedMateriel) {
      return res.status(404).json({ message: "Materiel non trouvé" });
    }

    res.status(200).json({
      message: "Materiel mis à jour avec succès",
      materiel: updatedMateriel,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
    
};

module.exports.reaffectMateriel=async(req,res)=>{
    console.log("Reaffectaion materiel");
    
    const {idMateriel}=req.params;
    const {nouvelUtilisateur}=req.body;
  //Trouver les info du nouveau user pour l'envoi de mail
  const newUser=await Agent.findById(nouvelUtilisateur);
  console.log("nom",newUser.nom);
  console.log("prenom",newUser.prenom);
  console.log("matricule",newUser.matricule);


    const materiel = await Materiel.findById(idMateriel).populate({
        "path":"userActuel",
        "select":"nom prenom matricule",
        populate:{
            "path":"site",
            "select":"nom"
        }
    });
    materiel.historique.push({
        user: `${materiel.userActuel.nom} ${materiel.userActuel.prenom}`,
        // site: materiel.userActuel.site?.toString() || ""
        site: materiel.userActuel.site.nom,
        dateAffect:materiel.dateAffect,
        dateReprise:new Date().toLocaleDateString("fr-FR"),
      });
      //Recuperer les info de l'ancien user
      const lastUserPrenom=materiel.userActuel.prenom
      const lastUserNom=materiel.userActuel.nom
      const lastUserMatricule=materiel.userActuel.matricule

      materiel.userActuel = nouvelUtilisateur;
      materiel.dateAffect=new Date().toLocaleDateString("fr-FR");
      await materiel.save();
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
        L'équipement <span class="highlight">${materiel.__t}</span> 
        de Numéro de Série <span class="highlight">${materiel.noSerie}</span> 
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

      const objet="Réaffection d'équipement";
      const destinataire="abdoulwahabballo24@gmail.com";
      await sendMail(objet,message,destinataire);


    res.status(200).json({
      message: "Matériel réaffecté avec succès",
      materiel
    });
}

module.exports.getMaterielsAgent=async(req,res)=>{
   try{
     const {idAgent}=req.params;
     const materiels=await Materiel.find({
        userActuel:idAgent
     }).sort({__t:1}) ;
    res.status(200).json({
      message: "Liste de matériels récupérés avec succès",
      materiels
    });
   }
   catch(err){
    console.error(err);
   }

}