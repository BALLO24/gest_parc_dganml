const express=require("express");
const utilisateurController=require("../controller/utilisateur.controller")
const router=express.Router();

router.post("/register",utilisateurController.signUp);
router.post("/login",utilisateurController.signIn);
router.get("/me",utilisateurController.me)
router.post("/logout",utilisateurController.logout);
router.post("/:idUser/password",utilisateurController.changePassword)
router.get("/",utilisateurController.getAllUsers)
router.delete("/:idToDelete",utilisateurController.deleteUser)


module.exports=router;