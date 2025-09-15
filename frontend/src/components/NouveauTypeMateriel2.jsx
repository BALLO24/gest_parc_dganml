// Nouveau composant formulaire pour ajouter un équipement
import { createPortal } from "react-dom";

const NouveauTypeMateriel = ({ isOpenFormNouveauTypeMateriel, closeFormNouveauTypeMateriel }) => {
  // const [formData, setFormData] = useState({
  //   type: '', marque: '', modele: '', serial: '', dateAcquisition: '', etat: '', utilisateur: '', autres: ''
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  if (!isOpenFormNouveauTypeMateriel) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
        aria-modal="true"
        role="dialog">
      <form onClick={(e)=>e.stopPropagation()} className="relative bg-white rounded-lg shadow-xl w-full max-w-xl p-6 transform transition-all duration-300 scale-100 opacity-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Ajouter un type de materiel</h3>
        
        {/* Bouton fermer */}
        <button
          type="button"
          onClick={closeFormNouveauTypeMateriel}
          className="absolute text-xl right-4 top-4 text-gray-500 hover:text-red-600 font-bold"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="site" placeholder="Nouveau type de matériel" className="border p-2 rounded" required />
          {/* <input type="text" name="utilisateur" placeholder="Utilisateur" className="border p-2 rounded" /> */}
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" className="px-4 py-2 rounded-md bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow">
            Ajouter
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default NouveauTypeMateriel;
