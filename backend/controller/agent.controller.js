const Agent=require("../model/agent.model")
module.exports.addAgent=async(req,res)=>{
    try{
        const data=req.body;
        const agent=new Agent(data)
        await agent.save();
        res.status(201).json(data)
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
};

module.exports.getAllAgents=async(req,res)=>{
    try{
        const agents=await Agent.find().populate("site")        
        res.status(200).json({agents,message:"Agents recupérés avec succès"})
        
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
};

module.exports.deleteAgent=async (req,res)=>{
    try{
       const {idToDelete}=req.params;
      const deletedAgent = await Agent.findByIdAndDelete(idToDelete);
      if(!deletedAgent){
        return res.status(404).json({ message: "Site non trouvé" }); }
         else{
        return res.status(200).json({ message: "Site supprimé avec succès" });
    }
    }
   
    catch(err){
        console.log(err);
    }
}

