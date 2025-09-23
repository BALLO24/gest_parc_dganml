require('dotenv').config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const USER_EMAIL = process.env.EMAIL_USER;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(objet,message,destinataire) {
  try {
    const accessTokenObj = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenObj?.token || accessTokenObj;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    const info = await transporter.sendMail({
      from: `"Cellule Informatique DGANML" <${USER_EMAIL}>`,
      to: destinataire,
      subject:objet,
      html:message,
      attachments: [{
      filename: "logo_asecna.png",
      path:__dirname + "/../public/logo_asecna.png", // chemin vers ton logo
      cid: "logoasecna" // identifiant à utiliser dans <img src="cid:...">
  }]
      
    });

    console.log("✅ Email envoyé:", info.messageId);
    
  } catch (err) {
    console.error("❌ Erreur d'envoi:", err);
  }
}

module.exports = sendMail;
