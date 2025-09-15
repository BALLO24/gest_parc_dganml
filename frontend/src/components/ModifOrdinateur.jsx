// Composant ModifOrdinateur — Modernisé avec Floating Inputs/Selects
import { createPortal } from "react-dom";
import { useState,useEffect } from "react";
import API from "../services/API";
import { data } from "../data/data";
import { ImSpinner } from "react-icons/im";
import { FiChevronDown } from "react-icons/fi";

// --- Composants réutilisables ---
const FloatingInput = ({ label, name, type = "text", defaultValue = "", required = false }) => (
  <div className="relative">
    <input
      name={name}
      type={type}
      placeholder=" "
      defaultValue={defaultValue}
      required={required}
      className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 
                 focus:outline-none focus:border-blue-500 focus:ring-0 sm:text-sm text-gray-700"
    />
    <label
      className="absolute left-3 -top-2 z-10 px-1 text-xs text-gray-500 bg-white transition-all duration-150
                 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
    >
      {label}
    </label>
  </div>
);

const FloatingSelect = ({ label, name, children, required = false, disabled = false }) => (
  <div className="relative">
    <select
      name={name}
      required={required}
      disabled={disabled}
      className={`peer appearance-none block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 pr-10 
                 focus:outline-none focus:border-blue-500 sm:text-sm text-gray-700 
                 ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
    >
      {children}
    </select>
    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
    <label
      className="absolute left-3 -top-2 z-10 px-1 text-xs text-gray-500 bg-white transition-all duration-150
                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:-top-2 peer-valid:text-xs"
    >
      {label}
    </label>
  </div>
);

const FloatingTextarea = ({ label, name, defaultValue = "" }) => (
  <div className="relative sm:col-span-2">
    <textarea
      name={name}
      placeholder=" "
      rows={2}
      defaultValue={defaultValue}
      className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 
                 focus:outline-none focus:border-blue-500 focus:ring-0 sm:text-sm text-gray-700"
    />
    <label
      className="absolute left-3 -top-2 z-10 px-1 text-xs text-gray-500 bg-white transition-all duration-150
                 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
    >
      {label}
    </label>
  </div>
);

// --- Composant principal ---
const ModifOrdinateur = ({ isOpenFormModifOrdinateur, closeFormModifOrdinateur, ordinateur, onSuccess }) => {
  const [isSubmetting, setIsSubmetting] = useState(false);
    const [agents,setAgents]=useState([]);
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { _id, ...dataForm } = Object.fromEntries(formData.entries());
    try {
      setIsSubmetting(true);
      await API.modifMateriel(_id, dataForm);
      onSuccess("Ordinateur modifié avec succès !");
      setIsSubmetting(false);
    } catch (err) {
      console.log(err);
      setIsSubmetting(false);
    }
  };

  if (!isOpenFormModifOrdinateur) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 transform transition-all duration-300 scale-100 opacity-100"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Modifier un ordinateur</h3>

        {/* Bouton fermer */}
        <button
          type="button"
          onClick={closeFormModifOrdinateur}
          className="absolute text-xl right-4 top-4 text-gray-500 hover:text-red-600 font-bold"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="hidden" name="_id" value={ordinateur._id} />

          {/* Type Ordinateur */}
          <FloatingSelect label="Type d'ordinateur" name="typeOrdinateur" required>
            {data.typeOrdinateur.map((el) => (
              <option key={el.id} value={el.nom} selected={el.nom === ordinateur.typeOrdinateur}>
                {el.nom}
              </option>
            ))}
          </FloatingSelect>

          {/* Marque */}
          <FloatingSelect label="Marque" name="marque" required>
            {data.marqueOrdinateur.map((el) => (
              <option key={el.id} value={el.nom} selected={el.nom === ordinateur.marque}>
                {el.nom}
              </option>
            ))}
          </FloatingSelect>

          {/* Modele */}
          <FloatingInput label="Modèle" name="modele" defaultValue={ordinateur.modele} required />
          <FloatingInput label="N° Série" name="noSerie" defaultValue={ordinateur.noSerie} required />
          <FloatingInput label="Processeur" name="processeur" defaultValue={ordinateur.processeur} required />

          {/* RAM */}
          <FloatingSelect label="RAM" name="ram" required>
            {data.ram.map((el) => (
              <option key={el.id} value={el.nom} selected={el.nom === ordinateur.ram}>
                {el.nom}
              </option>
            ))}
          </FloatingSelect>

          {/* Disque dur */}
          <FloatingSelect label="Disque Dur" name="disqueDur" required>
            {data.disqueDur.map((el) => (
              <option key={el.id} value={el.nom} selected={el.nom === ordinateur.disqueDur}>
                {el.nom}
              </option>
            ))}
          </FloatingSelect>

          {/* Type disque */}
          <FloatingSelect label="Type Disque Dur" name="typeDisqueDur" required>
            {data.typeDisquedur.map((el) => (
              <option key={el.id} value={el.nom} selected={el.nom === ordinateur.typeDisquedur}>
                {el.nom}
              </option>
            ))}
          </FloatingSelect>

          <FloatingInput label="Date d’acquisition" name="dateAcquisition" type="date" defaultValue={ordinateur.dateAchat} required />

          {/* Etat */}
          <FloatingSelect label="État" name="etat" required>
            {data.etatMateriel.map((el) => (
              <option key={el.id} value={el.nom} selected={el.nom === ordinateur.etat}>
                {el.nom}
              </option>
            ))}
          </FloatingSelect>

          {/* OS */}
          <FloatingSelect label="Système d’exploitation" name="systemeExploitation" required>
            {data.systemeExploitaion.map((el) => (
              <option key={el.id} value={el.nom} selected={el.nom === ordinateur.systemeExploitation}>
                {el.nom}
              </option>
            ))}
          </FloatingSelect>

          <FloatingSelect label="Licence OS" name="licenseSystemeExploitation" required>
            <option value="active" selected={ordinateur.licenseSystemeExploitation === "active"}>
              Active
            </option>
            <option value="inactive" selected={ordinateur.licenseSystemeExploitation !== "active"}>
              Inactive
            </option>
          </FloatingSelect>

          <FloatingSelect label="Office" name="office" required>
            {data.office.map((el) => (
              <option key={el.id} value={el.nom} selected={el.nom === ordinateur.office}>
                {el.nom}
              </option>
            ))}
          </FloatingSelect>

          <FloatingSelect label="Licence Office" name="licenseOffice" required>
            <option value="active" selected={ordinateur.licenseOffice === "active"}>
              Active
            </option>
            <option value="inactive" selected={ordinateur.licenseOffice !== "active"}>
              Inactive
            </option>
          </FloatingSelect>

          <FloatingSelect label="Antivirus" name="antivirus" required>
            {data.antivirus.map((el) => (
              <option key={el.id} value={el.nom} selected={el.nom === ordinateur.antivirus}>
                {el.nom}
              </option>
            ))}
          </FloatingSelect>

          <FloatingSelect label="Licence Antivirus" name="licenseAntivirus" required>
            <option value="active" selected={ordinateur.licenseAntivirus === "active"}>
              Active
            </option>
            <option value="inactive" selected={ordinateur.licenseAntivirus !== "active"}>
              Inactive
            </option>
          </FloatingSelect>
          <FloatingSelect label="Utilisateur actuel" name="userActuel" required disabled>
            {agents.map((agent, index) => (
              <option key={index} value={agent._id} selected={agent._id===ordinateur.userActuel._id}>
                {agent.prenom} {" "} {agent.nom}
              </option>
            ))}
          </FloatingSelect>

          <FloatingTextarea label="Autres informations" name="autres" defaultValue={ordinateur.commentaire} />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isSubmetting}
            className={`${isSubmetting ? "cursor-not-allowed opacity-80" : ""} px-4 py-2 rounded-md bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow`}
          >
            {isSubmetting ? <ImSpinner className="animate-spin inline-block w-5 h-5 mr-2" /> : null}
            {isSubmetting ? "Mise à jour..." : "Mettre à jour"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default ModifOrdinateur;
