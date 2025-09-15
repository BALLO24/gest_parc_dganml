const express=require("express");
const mongoose =require('./config/db');
const path=require("path");
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser")
const dotenv=require("dotenv");
const cors=require("cors");
const utilisateurRoutes=require("./route/utilisateur.route");
const materielRoutes=require("./route/materiel.route");
const siteRoutes=require("./route/site.route");
const agentRoutes=require("./route/agent.route");
const typeMaterielRoutes=require("./route/typeMateriel.route");
const sendMail=require("./function/sendMail")

const session=require("express-session");
const MongoStore=require("connect-mongo")

const app=express();
const router=express.Router()
dotenv.config({path:".env"});
app.use(express.static(path.join(__dirname, "public")));
const PORT=process.env.PORT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "super_secret_key", // clé secrète
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/gest_parc_dganml", // ta connexion MongoDB
      ttl: 60 * 60 * 24, // durée de vie des sessions (1 jour)
    }),
    cookie: {
      httpOnly: true,
      secure: false, // mettre true en production avec HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 jour
    },
  })
);

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  next();
}

app.use("/utilisateur",utilisateurRoutes);
app.use("/materiel",materielRoutes);
app.use("/site",siteRoutes);
app.use("/agent",agentRoutes);
app.use("/type-materiel",typeMaterielRoutes);
app.post("/mail",async (req,res)=>{
    try{
        await sendMail();
        res.status(200).json({message:"Mail envoyé avec succès !"})
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:"Probleme d'envoi de mail"})
        
    }
})

app.listen(PORT,()=>console.log(`Le serveur express tourne sur le port ${PORT}`)
);