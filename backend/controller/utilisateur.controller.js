const Utilisateur = require("../model/utilisateur.model");
const bcrypt=require("bcrypt");
const generateurMotDePasse=require("../function/generateurMotDePasse");
const sendMail=require("../function/sendMail")
module.exports.signUp=async (req,res)=>{
    try{
        const {matricule,nom,prenom,telephone,email,commentaires}=req.body;
        mot_de_passe=generateurMotDePasse(6)        
        const utilisateur=new Utilisateur({matricule,nom,prenom,telephone,email,mot_de_passe,commentaires})
        await utilisateur.save();
      const message=`
       <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width:600px; margin:auto; border:1px solid #e0e0e0; border-radius:8px; overflow:hidden;">
  
  <!-- Header avec logo -->
  <div style="background:#2c7be5; padding:20px; text-align:center;">
    <img src="cid:logoasecna" alt="Logo ASECNA" style="max-height:60px; display:block; margin:auto;">
  </div>
  
  <!-- Contenu -->
  <div style="padding:20px;">
    <h2 style="color:#2c7be5; margin-top:0;">Votre compte a été créé </h2>
    <p>Bonjour <strong>${prenom} ${nom}</strong>,</p>
    <p>Votre compte a été créé avec succès dans notre système dans notre système de gestion parc informatique.</p>
    
    <p>Voici vos identifiants de connexion :</p>
    <div style="background:#f4f6f8; padding:12px; border-radius:6px; margin:10px 0;">
      <p><strong>Nom d’utilisateur :</strong> ${email} </p>
      <p><strong>Mot de passe temporaire :</strong> ${mot_de_passe}</p>
    </div>
    
    <p><strong style="color:#d9534f;">⚠️ Pour des raisons de sécurité, merci de changer ce mot de passe dès votre première connexion.</strong></p>
    
    <p style="text-align:center;">
      <a href="127.0.0.1:5173" 
         style="background:#2c7be5; color:#fff; padding:12px 20px; border-radius:6px; text-decoration:none; font-weight:bold;">
         Se connecter
      </a>
    </p>
    
    <p>Si vous rencontrez des difficultés, contactez l’administrateur.</p>
    <p>Cordialement,<br>L’équipe support.</p>
  </div>
  
  <!-- Footer -->
  <div style="background:#f4f6f8; padding:10px; text-align:center; font-size:12px; color:#777;">
    &copy; 2025 Délégation ASECNA MALI. Tous droits réservés.
  </div>
</div>
`;

const objet="Création de compte Gest Parc"
      await sendMail(objet,message,email)


        return res.status(201).send("Utilisateur créé avec succès")
        
    }
    catch(err){
        console.log(err);
        return res.status(401).send("erreur")
    }
}   

module.exports.signIn=async (req, res) => {
  const { email, mot_de_passe } = req.body;  
  

  try {
    const user = await Utilisateur.findOne({ email });
    if (!user) return res.status(401).json({ message: "Utilisateur introuvable" });    
    const valid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    
    if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

    // Sauvegarde dans la session
    req.session.userId = user._id;
    req.session.userName=user.nom;
   
    //req.session.role = user.role;
        
    res.json({ success:true,message: "Connexion réussie", user: { id: user._id, email: user.email, nom:user.nom } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

module.exports.logout=(req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Erreur logout" });
    res.clearCookie("connect.sid"); // cookie par défaut
    res.json({ message: "Déconnecté" });
  });
};

// controllers/userController.js

module.exports.changePassword = async (req, res) => {
  try {
    const {idUser} = req.params;
    const { mot_de_passe } = req.body;
    

    // if (!password || password.length < 3) {
    //   return res.status(400).json({ message: "Mot de passe trop court" });
    // }

    const user = await Utilisateur.findById(idUser);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.mot_de_passe=mot_de_passe;

    await user.save();

    res.json({ success:true, message: "Mot de passe mis à jour avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


module.exports.getAllUsers=async (req,res)=>{
    try{
       const utilisateurs=await Utilisateur.find();
       res.status(200).json({utilisateurs,message:"Utilisateurs recupérés avec succès"})
       
    }
    catch(err){
        console.log(err);
        res.status(404).send("erreur survenue lors de get users")
    }
}

module.exports.deleteUser=async (req,res)=>{
    try{
       const {idToDelete}=req.params;
      const deletedUser = await Utilisateur.findByIdAndDelete(idToDelete);
      if(!deletedUser){
        return res.status(404).json({ message: "Utilisateur non trouvé" }); }
         else{
        return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    }
    }
   
    catch(err){
        console.log(err);
    }
}

module.exports.me=(req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Non connecté" });
  }
  res.json({ userId: req.session.userId,userName:req.session.userName });
};
