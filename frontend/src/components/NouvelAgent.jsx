
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { FiChevronDown } from "react-icons/fi";
import API from "../services/API";

const FloatingInput = ({ label, name, type = "text", specialClass,required = false }) => (
  <div className="relative">
    <input
      name={name}
      type={type}
      placeholder=" "
      required={required}
      className={`${specialClass} peer block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-0 sm:text-sm text-gray-700`}
    />
    <label className="absolute left-3 -top-2 z-10 px-1 text-xs text-gray-500 bg-white transition-all duration-150
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600">
      {label}
    </label>
  </div>
);

const FloatingSelect = ({ label, name, children, required = false }) => (
  <div className="relative">
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

const FloatingTextarea = ({ label, name }) => (
  <div className="relative sm:col-span-2">
    <textarea
      name={name}
      placeholder=" "
      rows={2}
      className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-0 sm:text-sm text-gray-700"
    />
    <label className="absolute left-3 -top-2 z-10 px-1 text-xs text-gray-500 bg-white transition-all duration-150
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600">
      {label}
    </label>
  </div>
);

const NouvelAgent = ({ isOpenFormNouvelAgent, closeFormNouvelAgent, onSuccess }) => {
  const [sites, setSites] = useState([]);
  const [isSubmetting, setIsSubmetting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.getSites();
        setSites(res.sites || []);
      } catch (err) {
        console.error("Erreur chargement sites:", err);
        setSites([]);
      }
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData.entries());
    try {
      setIsSubmetting(true);
      await API.addAgent(dataObj);
      onSuccess();
    } catch (err) {
      console.log(err);
      setIsSubmetting(false);
    }
  };

  if (!isOpenFormNouvelAgent) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300" aria-modal="true" role="dialog">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-xl p-6 transform transition-all duration-300 scale-100 opacity-100"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Ajouter un utilisateur</h3>

        {/* Bouton fermer */}
        <button
          type="button"
          onClick={closeFormNouvelAgent}
          className="absolute text-xl right-4 top-4 text-gray-500 hover:text-red-600 font-bold"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingInput label="Matricule" name="matricule" required />

          <FloatingSelect label="Site" name="site" required>
            {sites.map((site, index) => (
              <option key={index} value={site._id}>
                {site.nom}
              </option>
            ))}
          </FloatingSelect>

          <FloatingInput label="Nom" name="nom" required/>
          <FloatingInput label="Prénom" name="prenom" required />
          <FloatingInput label="Téléphone" name="telephone" required />
          <FloatingInput label="Email" name="email" type="email" required />
          <FloatingTextarea label="Autres informations" name="autres" />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isSubmetting}
            className={`${isSubmetting ? "cursor-not-allowed opacity-80" : ""} px-4 py-2 rounded-md bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow`}
          >
            {isSubmetting ? <ImSpinner className="animate-spin inline-block w-5 h-5 mr-2" /> : "Ajouter"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default NouvelAgent;
