import { TbListDetails } from "react-icons/tb";
import { createPortal } from "react-dom";

const DetailModalAgent = ({ isOpenModalInfo, onCloseModalInfo,  }) => {
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
        onClick={(e) => e.stopPropagation()} //  empêche la fermeture si on clique dans le contenu
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-t-lg">
          <div className="flex items-center">
            <TbListDetails className="text-2xl text-white mr-2 font-bold" />
            <h3 className="text-lg font-semibold text-white animate-bounce duration-1000 inline-flex">
              Informations supplémentaires
            </h3>
          </div>
          {/*  bouton de fermeture corrigé */}
          <button
            onClick={onCloseModalInfo}
            className="text-white font-bold text-lg hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-gray-700 text-sm">
          <p><span className="font-semibold">Matricule : </span>319367</p>
          <p><span className="font-semibold">Nom : </span>Abdoul Wahab BALLO</p>
          <p><span className="font-semibold">Service : </span>Maintenance</p>
          <p><span className="font-semibold">email : </span>awballo22@gmail.com</p>
          <p><span className="font-semibold">Téléphone : </span>+223 64 60 00 36</p>
          <p><span className="font-semibold">Equipements : </span>Ordinateur Portable Dell, Ordinateur Bureatique, imprimante</p>
          <p><span className="font-semibold">Autres infos : </span>blalalblablablalalblablablalalblablablalalblabla</p>
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

export default DetailModalAgent;
