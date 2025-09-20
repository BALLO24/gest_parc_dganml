import { TbListDetails } from "react-icons/tb";
import { createPortal } from "react-dom";

const DetailModalNAS = ({ isOpenModalInfo, onCloseModalInfo, nas}) => {
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
        <div className="p-6 text-gray-700 text-sm">
          <p><span className="font-semibold">Marque : </span>{nas.marque}</p>
          <p><span className="font-semibold">Modele : </span>{nas.modele}</p>
          <p><span className="font-semibold">Nombre de slots disque : </span>{nas.nbreSlotDisque}</p>
          <p><span className="font-semibold">Numero de série : </span>{nas.noSerie}</p>
          <p><span className="font-semibold">Date d'acquisition : </span>{nas.dateAchat}</p>
          <p><span className="font-semibold">Etat : </span>{nas.etat}</p>
          <p><span className="font-semibold">Utilisateur actuel : </span>{nas.userActuel.prenom} {nas.userActuel.nom}</p>
          <p><span className="font-semibold">Site actuel : </span>{nas.userActuel.site.nom}</p>
          <p><span className="font-semibold">Autres infos : </span>{nas.commentaire}</p>
          <div className="mt-4">
            <span className="font-semibold">Historique :</span>
            {nas.historique.length !== 0 ? (
              <table className="min-w-full mt-2 text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b text-left">No.</th>
                    <th className="px-4 py-2 border-b text-left">Utilisateur</th>
                    <th className="px-4 py-2 border-b text-center">Période</th>
                    <th className="px-4 py-2 border-b text-right">Site</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {nas.historique.map((element, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b text-left">{index+1}</td>
                      <td className="px-4 py-2 border-b text-left">{element.user}</td>
                      <td className="px-4 py-2 border-b font-semibold text-center"><span className="text-green-600">{element.dateAffect}</span> {" - "} <span className="text-red-600">{element.dateReprise}</span></td>
                      <td className="px-4 py-2 border-b text-right">{element.site}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="italic mt-2">Cet équipement n'a pas encore changé de propriétaire.</p>
            )}
          </div>
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

export default DetailModalNAS;
