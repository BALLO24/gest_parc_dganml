const crypto = require("crypto"); //Il est natif à node js donc pas d'installation requise

function generateurMotDePasse(length = 12) {
  return crypto
    .randomBytes(length)
    .toString("base64") // transforme en base64
    .slice(0, length)   // coupe à la taille souhaitée
    .replace(/[+/]/g, "A"); // retire caractères ambigus si besoin
}

module.exports=generateurMotDePasse