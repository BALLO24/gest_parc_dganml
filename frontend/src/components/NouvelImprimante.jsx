import { createPortal } from "react-dom";
import { ImSpinner } from "react-icons/im";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import API from "../services/API";
import { useEffect } from "react";
import { data } from "../data/data";



const FloatingInput = ({ label, name, type = "text", required = false, defaultValue,disabled }) => (
  <div className="relative">
    <input
      name={name}
      type={type}
      placeholder=" "
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 
        focus:outline-none focus:border-blue-500 focus:ring-0 sm:text-sm text-gray-700"
    />
    <label
      className="absolute left-3 -top-2 z-10 px-1 text-xs text-gray-500 bg-white transition-all duration-150
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
    >
      {label}
    </label>
  </div>
);

const FloatingSelect = ({ label, name, children, required = false,defaultValue }) => (
  <div className="relative">
    <select
      name={name}
      required={required}
      defaultValue={defaultValue}
      className="peer appearance-none block w-full rounded-md border border-gray-300 bg-transparent 
        px-3 py-2 pr-10 focus:outline-none focus:border-blue-500 sm:text-sm text-gray-700"
    >
      {children}
    </select>

    {/* Chevron custom */}
    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

    <label
      className="absolute left-3 -top-2 z-10 px-1 text-xs text-gray-500 bg-white transition-all duration-150
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 
        peer-valid:-top-2 peer-valid:text-xs"
    >
      {label}
    </label>
  </div>
);

const FloatingTextarea = ({ label, name }) => (
  <div className="relative sm:col-span-2">
    <textarea
      name={name}
      placeholder=" "
      rows={2}
      className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 
        focus:outline-none focus:border-blue-500 focus:ring-0 sm:text-sm text-gray-700"
    />
    <label
      className="absolute left-3 -top-2 z-10 px-1 text-xs text-gray-500 bg-white transition-all duration-150
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
    >
      {label}
    </label>
  </div>
);

const NouvelImprimante = ({
  isOpenFormNouvelImprimante,
  closeFormNouvelImprimante,
  onSuccess,
}) => {
  const [isSubmetting, setIsSubmetting] = useState(false);
    useEffect(() => {
      const load = async () => {
        try {
          const res = await API.getAgents();
          setAgents(res.agents || []);
        } catch (err) {
          console.error("Erreur chargement users:", err);
          setAgents([]);
        }
      };
      load();
    }, []);
  
    const formatDateInput = (value) => {
      if (!value) return "";
      const [year, month, day] = value.split("-");
      return `${day}/${month}/${year}`;
    };
  const [agents, setAgents] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData.entries()); // convert FormData → objet
    const {dateAchatNonFormatted,...data}=dataObj
    console.log(data);
    const dateAchat=formatDateInput(dateAchatNonFormatted);
    const dateAffect=new Date().toLocaleDateString("fr-FR");
    const finalData={dateAchat,dateAffect,...data};

    console.log(finalData);
    
    
    
    try {
      setIsSubmetting(true);
      await API.addMateriel(finalData);
      onSuccess("Imprimante ajouté avec succès !");
      setIsSubmetting(false);
    } catch (err) {
      console.log(err);
      setIsSubmetting(false);
    }
  };

  if (!isOpenFormNouvelImprimante) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-xl p-6 transform transition-all duration-300 scale-100 opacity-100"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Ajouter une imprimante
        </h3>

        {/* Bouton fermer */}
        <button
          type="button"
          onClick={closeFormNouvelImprimante}
          className="absolute text-xl right-4 top-4 text-gray-500 hover:text-red-600 font-bold"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="hidden" name="type" value="imprimante" />

          <FloatingSelect label="Type imprimante" name="typeImprimante" required>
            {data.typeImprimante.map((el,index)=>(<option key={index} value={el.nom}>{el.nom}</option>))}
          </FloatingSelect>
          <FloatingSelect label="Recto verso" name="rectoVerso" required>
            <option value="">---</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </FloatingSelect>

          <FloatingInput label="Marque" name="marque" required />
          <FloatingInput label="Modèle" name="modele" required />
          <FloatingInput label="N° série" name="noSerie" required />

          <FloatingInput label="Date acquisition" type="date" name="dateAchat" required />

          <FloatingSelect label="État" name="etat" required>
            <option value="">---</option>
            <option value="Excellent">Excellent</option>
            <option value="Bon">Bon</option>
            <option value="Moyen">Moyen</option>
            <option value="Mauvais">Mauvais</option>
          </FloatingSelect>

          <FloatingSelect label="Couleur" name="couleur" required>
            <option value="">---</option>
            <option value="Monochrome">Monochrome</option>
            <option value="En Couleur">En couleur</option>
          </FloatingSelect>

          <FloatingSelect label="Type Bac" name="typeBac" required>
            <option value="">---</option>
            <option value="Chargeur">Chargeur</option>
            <option value="Plateau">Plateau</option>
            <option value="Chargeur + Plateau">Chargeur + Plateau</option>
          </FloatingSelect>

          <FloatingSelect label="Utilisateur actuel" name="userActuel" required>
            {agents.map((agent, index) => (
              <option key={index} value={agent._id}>
                {agent.nom} {" "} {agent.prenom}
              </option>
            ))}
          </FloatingSelect>

          <FloatingTextarea label="Autres informations" name="commentaire" />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isSubmetting}
            className={`${
              isSubmetting ? "cursor-not-allowed opacity-80" : ""
            } px-4 py-2 rounded-md bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow`}
          >
            {isSubmetting ? (
              <ImSpinner className="animate-spin inline-block w-5 h-5 mr-2" />
            ) : "Ajouter"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default NouvelImprimante;
