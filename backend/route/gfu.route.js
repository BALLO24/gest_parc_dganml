const express=require("express");
const gfuController=require("../controller/gfu.controller")
const router=express.Router();

router.post("/",gfuController.addNumGfu);
router.get("/",gfuController.getAllNumGfu)
router.delete("/:idToDelete",gfuController.deleteNumGfu);
router.patch("/:idGfu/reaffect",gfuController.reaffectGfu);

module.exports=router;