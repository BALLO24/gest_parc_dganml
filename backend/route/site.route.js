const express=require("express");
const siteController=require("../controller/site.controller")
const router=express.Router();

router.post("/",siteController.addSite);
router.get("/",siteController.getAllSites)
router.delete("/:idToDelete",siteController.deleteSite);
// router.patch("/:idToModif",siteController.modifMateriel)

module.exports=router;