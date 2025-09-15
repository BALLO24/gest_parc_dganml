const express=require("express");
const agentController=require("../controller/agent.controller")
const router=express.Router();

router.post("/",agentController.addAgent);
router.get("/",agentController.getAllAgents)
router.delete("/:idToDelete",agentController.deleteAgent);
// router.patch("/:idToModif",agentController.modifMateriel)

module.exports=router;