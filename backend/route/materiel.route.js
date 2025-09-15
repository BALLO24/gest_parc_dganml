const express=require("express");
const materielController=require("../controller/materiel.controller")
const router=express.Router();

router.post("/",materielController.addMateriel);
router.get("/",materielController.getAllMateriels);
router.get("/:idAgent",materielController.getMaterielsAgent)
router.delete("/:idToDelete",materielController.deleteMateriel);
router.patch("/:idToModif",materielController.modifMateriel);
router.patch("/:idMateriel/reaffect",materielController.reaffectMateriel);


module.exports=router;