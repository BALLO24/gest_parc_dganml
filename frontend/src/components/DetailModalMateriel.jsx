import { TbListDetails } from "react-icons/tb";
import { createPortal } from "react-dom";

const DetailModalMateriel = ({ isOpenModalInfo, onCloseModalInfo, }) => {
  if (!isOpenModalInfo) return null;

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={onCloseModalInfo} // ✅ clic sur l’arrière-plan ferme le modal
    >
      {/* Modal Container */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-xl transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()} // ✅ empêche la fermeture si on clique dans le contenu
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-t-lg">
          <div className="flex items-center">
            <TbListDetails className="text-2xl text-white mr-2 font-bold" />
            <h3 className="text-lg font-semibold text-white animate-bounce duration-1000 inline-flex">
              Informations supplémentaires
            </h3>
          </div>
          {/* ✅ bouton de fermeture corrigé */}
          <button
            onClick={onCloseModalInfo}
            className="text-white font-bold text-lg hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-gray-700 text-sm">
          <p><span className="font-semibold">Type : </span>Ordinateur</p>
          <p><span className="font-semibold">Marque : </span>Lenovo</p>
          <p><span className="font-semibold">Modele : </span>ThinkPad core i5 12ème Génération</p>
          <p><span className="font-semibold">Numero de série : </span>MP2BACFAM1</p>
          <p><span className="font-semibold">Date d'acquisition : </span>12/06/2018</p>
          <p><span className="font-semibold">Etat : </span>Excellent</p>
          <p><span className="font-semibold">Système d'exploitation : </span>Windows 11</p>
          <p><span className="font-semibold">Etat du système d'exploitation : </span>Activé</p>
          <p><span className="font-semibold">Office : </span>Office 2021</p>
          <p><span className="font-semibold">Licence Office </span>Activé</p>
          <p><span className="font-semibold">Antivirus : </span>Kaspersky Foundation</p>
          <p><span className="font-semibold">Licence antivirus : </span>Activé</p>
          <p><span className="font-semibold">Site actuel : </span>Kayes</p>
          <p><span className="font-semibold">Utilisateur actuel : </span>Lassine KONATE</p>
          <p><span className="font-semibold">Historique : </span>Michel DEMBELE, Diarra SAMAKE, Boubacar MAGASSOUBA</p>
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

export default DetailModalMateriel;
