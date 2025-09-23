// ReaffectMateriel.jsx modernisé avec FloatingSelect et labels flottants
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import API from "../services/API";
import { ImSpinner } from "react-icons/im";
import { FiChevronDown } from "react-icons/fi";

const FloatingSelect = ({ label, name, children, required = false }) => (
  <div className="relative mt-6">
    <select
      name={name}
      required={required}
      className="peer appearance-none block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 pr-10 focus:outline-none focus:border-blue-500 sm:text-sm text-gray-700"
    >
      {children}
    </select>
    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
    <label className="absolute left-3 -top-2 z-10 px-1 text-xs text-gray-500 bg-white transition-all duration-150
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:-top-2 peer-valid:text-xs">
      {label}
    </label>
  </div>
);

const ReaffectGFU = ({ isOpenModalInfo, onCloseModalInfo, gfu, onSuccess }) => {
  const [isSubmetting, setIsSubmetting] = useState(false);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.getAgents();
        setAgents(res.agents || []);
      } catch (err) {
        console.error("Erreur chargement agents:", err);
        setAgents([]);
      }
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      setIsSubmetting(true);
      await API.reaffectGfu(gfu._id, data);
      onSuccess("GFU réaffecté avec succès !");
      setIsSubmetting(false);
    } catch (err) {
      console.log(err);
      setIsSubmetting(false);
    }
  };

  if (!isOpenModalInfo) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300" aria-modal="true" role="dialog">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-xl p-6 transform transition-all duration-300 scale-100 opacity-100"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Réaffecter un numéro GFU</h3>

        <button
          type="button"
          onClick={onCloseModalInfo}
          className="absolute text-xl right-4 top-4 text-gray-500 hover:text-red-600 font-bold"
        >
          ✕
        </button>

        <div className="text-gray-700 text-sm">
          <p className="m-4 cursor-not-allowed">
            <span className="border rounded-md border-gray-300 p-2">{gfu.userActuel.prenom} {gfu.userActuel.nom}</span>
          </p>
          <p className="m-4">
            <FloatingSelect label="Nouvel utilisateur" name="nouvelUtilisateur" required>
              {agents.map((agent, index) =>
                agent.matricule !== gfu.userActuel.matricule && (
                  <option key={index} value={agent._id}>{agent.prenom} {agent.nom}</option>
                )
              )}
            </FloatingSelect>
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isSubmetting}
            className={`${isSubmetting ? "cursor-not-allowed opacity-80" : ""} px-4 py-2 rounded-md bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow`}
          >
            {isSubmetting ? <ImSpinner className="animate-spin inline-block w-5 h-5 mr-2" /> : "Réaffecter"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default ReaffectGFU;
