import { TbListDetails } from "react-icons/tb";
import { createPortal } from "react-dom";
import API from "../services/API";

const ListeMaterielsAgent = ({ isOpenModalInfo, onCloseModalInfo,liste}) => {

  if (!isOpenModalInfo) return null;

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={onCloseModalInfo} // clic sur l’arrière-plan ferme le modal
    >
      {/* Modal Container */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-xl transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()} // empêche la fermeture si on clique dans le contenu
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-t-lg">
          <div className="flex items-center">
            <TbListDetails className="text-2xl text-white mr-2 font-bold" />
            <h3 className="text-lg font-semibold text-white animate-bounce duration-1000 inline-flex">
              Informations supplémentaires
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
{/* Body */}
<div className="p-6 text-gray-700 text-sm">
  { liste.length !=0 ? <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
    <thead className="rounded-lg">
      <tr>
        <th className="px-4 py-2 text-left">No</th>
        <th className="px-4 py-2 text-left">Type</th>
        <th className="px-4 py-2 text-left">N° Série</th>
        <th className="px-4 py-2 text-left">Marque</th>
        <th className="px-4 py-2 text-left">Modèle</th>
      </tr>
    </thead>
    <tbody>
      {liste.map((materiel, index) => (
        <tr
          key={index}
          className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
        >
          <td className="px-2 py-2">{index + 1}</td>
          <td className="px-2 py-2">{materiel.__t}</td>
          <td className="px-2 py-2">{materiel.noSerie}</td>
          <td className="px-2 py-2">{materiel.marque}</td>
          <td className="px-2 py-2">{materiel.modele}</td>
        </tr>
      ))}
    </tbody>
  </table> : <p className="font-semibold italic">Cet utilisateur n'a pas encore de matériel dans la base.</p> }
</div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg text-sm font-bold">
          <button
            onClick={onCloseModalInfo}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-red-400 via-red-500 to-red-800 shadow-lg text-white transform transition-all duration-500 ease-in-out hover:from-red-500 hover:via-red-600 hover:to-red-700 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ListeMaterielsAgent;
