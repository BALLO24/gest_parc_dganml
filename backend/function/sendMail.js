require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,           // 465 pour SSL/TLS
  secure: true,        // true = SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // optional: increase timeouts if nécessaire
  // connectionTimeout: 10000,
  // greetingTimeout: 5000,
});

// Vérifie la connexion au démarrage (log utile en dev)
async function verifyTransporter() {
  try {
    await transporter.verify();
    console.log("✅ Transporter SMTP prêt (Gmail App Password).");
  } catch (err) {
    console.error("❌ Échec verification transporter:", err);
  }
}
verifyTransporter();

async function sendMail(objet,message,destinataire) {
  try {
    const mailOptions = {
    from: `"Cellule Informatique DGANML" <${process.env.EMAIL_USER}>`,
      to: destinataire,
      subject:objet,
      html:message,
      attachments: [{
      filename: "logo_asecna.png",
      path:__dirname + "/../public/logo_asecna.png", // chemin vers ton logo
      cid: "logoasecna" // identifiant à utiliser dans <img src="cid:...">
  }]
    };

    const info = await transporter.sendMail(mailOptions);
    // info.messageId, envelope, accepted, rejected, response...
    return { success: true, info };
  } catch (error) {
    // Log utile pour debug côté serveur
    console.error("Erreur envoi mail:", error);
    // Standardiser la réponse d'erreur pour le reste de ton app
    return { success: false, error: error.message || error };
  }
}

module.exports = sendMail;
