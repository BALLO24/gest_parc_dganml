const typeMaterielModel=require("../model/typeMateriel.model")
module.exports.addTypeMateriel=async(req,res)=>{
    try{
        const data=req.body;
        const typeMateriel=new typeMaterielModel(data)
        await typeMateriel.save();
        res.status(201).json(data)
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
};

module.exports.getAllTypesMateriels=async(req,res)=>{
    try{
        const typesMateriels=await typeMaterielModel.find();
        
        res.status(200).json({typesMateriels,message:"Types recupérés avec succès !"})
        
    }
    catch(err){
        console.log(err);
        throw err;
        
    }
};

module.exports.deleteTypeMateriel=async (req,res)=>{
    try{
       const {idToDelete}=req.params;
      const deletedTypeMateriel = await typeMaterielModel.findByIdAndDelete(idToDelete);
      if(!deletedTypeMateriel){
        return res.status(404).json({ message: "Type de materiel non trouvé" }); }
         else{
        return res.status(200).json({ message: "Type de materiel supprimé avec succès" });
    }
    }
   
    catch(err){
        console.log(err);
    }
}
