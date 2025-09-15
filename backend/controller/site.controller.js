const Site=require("../model/site.model")
module.exports.addSite=async(req,res)=>{
    try{
        const data=req.body;
        const site=new Site(data)
        await site.save();
        res.status(201).json(data)
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
};

module.exports.getAllSites=async(req,res)=>{
    try{
        const sites=await Site.find();
        
        res.status(200).json({sites,message:"Sites recupérés avec succès"})
        
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
}

module.exports.deleteSite=async (req,res)=>{
    try{
       const {idToDelete}=req.params;
      const deletedSite = await Site.findByIdAndDelete(idToDelete);
      if(!deletedSite){
        return res.status(404).json({ message: "Site non trouvé" }); }
         else{
        return res.status(200).json({ message: "Site supprimé avec succès" });
    }
    }
   
    catch(err){
        console.log(err);
    }
}
