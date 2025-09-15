import {useState, useEffect } from "react";
import { TbListDetails } from "react-icons/tb";
import { createPortal } from "react-dom";
import API from "../services/API";

const ReafectMateriel = ({ isOpenModalInfo, onCloseModalInfo, materiel,onSuccess}) => {
  const [agents,setAgents]=useState([]);
    const [isSubmetting,setIsSubmetting]=useState(false);
  
    // --- load agents ---
    useEffect(() => {
      const load = async () => {
        try {
          const res = await API.getAgents();
          setAgents(res.agents || []);
          console.log(agents);
          
        } catch (err) {
          console.error("Erreur chargement users:", err);
          setAgents([]);
        }
      };
      load();
    }, []);

      const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const data = Object.fromEntries(formData.entries()); // convert FormData → objet
        try{
          setIsSubmetting(true);
          await API.reaffectMateriel(materiel._id,data);
          onSuccess("Materiel reaffecté avec succès !");
          setIsSubmetting(false)
    
        }
        catch(err){
          console.log(err);
          setIsSubmetting(false)
        }
      }
    
  

  if (!isOpenModalInfo) return null;

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={onCloseModalInfo} // clic sur l’arrière-plan ferme le modal
    >
      {/* Modal Container */}
      <form onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl w-full max-w-xl transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()} // empêche la fermeture si on clique dans le contenu
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-t-lg">
          <div className="flex items-center">
            <TbListDetails className="text-2xl text-white mr-2 font-bold" />
            <h3 className="text-lg font-semibold text-white animate-bounce duration-1000 inline-flex">
              Réaffectation de materiel
            </h3>
          </div>
          {/*  bouton de fermeture  */}
          <button
            onClick={onCloseModalInfo}
            className="text-white font-bold text-lg hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-gray-700 text-sm">
            <p className="m-4 cursor-not-allowed ">
              <span className="border rounded-md border-gray-300 p-2">{materiel.userActuel.prenom} {" "} {materiel.userActuel.nom}</span>
            </p>
            <p className="m-4">
            <select name="nouvelUtilisateur" className="border p-2 rounded" required>
                {agents.map((agent,index)=>(agent.matricule !=materiel.userActuel.matricule && <option key={index}>{agent.prenom} {" "} {agent.nom}</option>))}
          </select>
            </p>

        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg text-sm font-bold">
          <button type="submit" disabled={isSubmetting} className={`${isSubmetting ? "cursor-not-allowed":""} px-4 py-2 rounded-md bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow`}>
            {isSubmetting ?  <ImSpinner className="animate-spin w-10"/> : "Ajouter"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default ReafectMateriel;
