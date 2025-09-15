const express=require("express");
const typeMaterielController=require("../controller/typeMateriel.controller")
const router=express.Router();

router.post("/",typeMaterielController.addTypeMateriel);
router.get("/",typeMaterielController.getAllTypesMateriels)
router.delete("/:idToDelete",typeMaterielController.deleteTypeMateriel);
// router.patch("/:idToModif",siteController.modifMateriel)

module.exports=router;