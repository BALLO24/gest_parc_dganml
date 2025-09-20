const mongoose = require("mongoose");

// Schéma parent
const materielSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  noSerie: String,
  dateAchat: String,
  etat: String,
  commentaire: String,
  userActuel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
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
}, {
  discriminatorKey: '__t',
  collection: 'materiels',
  timestamps: true
});

// Modèle parent
const Materiel = mongoose.model("Materiel", materielSchema);

// Discriminator Ordinateur
const Ordinateur = Materiel.discriminator("Ordinateur",
  new mongoose.Schema({
    typeOrdinateur:String,
    processeur: String,
    ram: String,
    disqueDur:String,
    typeDisqueDur:String,
    systemeExploitation:String,
    licenseSystemeExploitation:String,
    office:String,
    licenseOffice:String,
    antivirus:String,
    licenseAntivirus:String

  },)
);

// Discriminator Switch
const Switch = Materiel.discriminator("Switch",
  new mongoose.Schema({
    nbrePort: Number,
    poe:String,
    manageable: String,
  })
);

const AutoComm = Materiel.discriminator("AutoComm",
  new mongoose.Schema({
    nbrePort: Number,
  })
);

const Telephone = Materiel.discriminator("Telephone",
  new mongoose.Schema({
    intGraphique: String,
  })
);

const NAS = Materiel.discriminator("NAS",
  new mongoose.Schema({
    nbreSlotDisque: String,
  })
);

const AP = Materiel.discriminator("AP",
  new mongoose.Schema({
    
  })
);

const KVM = Materiel.discriminator("KVM",
  new mongoose.Schema({
    
  })
);

const Antenne = Materiel.discriminator("Antenne",
  new mongoose.Schema({
    diametre:String
  })
);



const PareFeu = Materiel.discriminator("PareFeu",
  new mongoose.Schema({
    nbrePort: String,
  })
);



// Discriminator Routeur
const Routeur = Materiel.discriminator("Routeur",
  new mongoose.Schema({
    vitesse:String,
    nbrePort: String,
    poe: String,
  })
);

// Discriminator Imprimante
const Imprimante = Materiel.discriminator("Imprimante",
  new mongoose.Schema({
    typeImprimante:String, //simple ou multifonction
    typeBac: String,
    couleur: String,
    rectoVerso:String
  })
);

const Scanner = Materiel.discriminator("Scanner",
  new mongoose.Schema({
    typeBac: String,
    rectoVerso:String
  })
);


// Discriminator Copieur
const Copieur = Materiel.discriminator("Copieur",
  new mongoose.Schema({
    vitesse: String,
    couleur: String,
    rectoVerso: String,
  })
);


// Discriminator Onduleur
const Onduleur = Materiel.discriminator("Onduleur",
  new mongoose.Schema({
    typeOnduleur:String,
    puissance: String,
  })
);


const Controleur = Materiel.discriminator("Controleur",
  new mongoose.Schema({
    nbrePort:String,
  })
);

const Projecteur = Materiel.discriminator("Projecteur",
  new mongoose.Schema({
    imgQualite:String,
  })
);




module.exports = { Materiel, Ordinateur,Onduleur, Switch, Routeur,PareFeu, AutoComm,Telephone,Copieur,Imprimante,Scanner,Controleur,Projecteur,NAS,AP,KVM,Antenne };
