import { TbListDetails } from "react-icons/tb";
import { createPortal } from "react-dom";

const DetailModalOrdinateur = ({ isOpenModalInfo, onCloseModalInfo, ordinateur}) => {
  if (!isOpenModalInfo) return null;

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={onCloseModalInfo}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-xl transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-t-lg">
          <div className="flex items-center">
            <TbListDetails className="text-2xl text-white mr-2 font-bold" />
            <h3 className="text-lg font-semibold text-white animate-bounce duration-1000 inline-flex">
              Informations supplémentaires
            </h3>
          </div>
          <button
            onClick={onCloseModalInfo}
            className="text-white font-bold text-lg hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="p-6 text-gray-700 text-sm">
          <p><span className="font-semibold">Type : </span>{ordinateur.typeOrdinateur}</p>
          <p><span className="font-semibold">Marque : </span>{ordinateur.marque}</p>
          <p><span className="font-semibold">Modele : </span>{ordinateur.modele}</p>
          <p><span className="font-semibold">Processeur : </span>{ordinateur.processeur}</p>
          <p><span className="font-semibold">RAM : </span>{ordinateur.ram}</p>
          <p><span className="font-semibold">Disque dur : </span>{ordinateur.disqueDur} {ordinateur.typeDisqueDur}</p>
          <p><span className="font-semibold">Numero de série : </span>{ordinateur.noSerie}</p>
          <p><span className="font-semibold">Date d'acquisition : </span>{ordinateur.dateAchat}</p>
          <p><span className="font-semibold">Etat : </span>{ordinateur.etat}</p>
          <p><span className="font-semibold">Système d'exploitation : </span>{ordinateur.systemeExploitation}</p>
          <p><span className="font-semibold">License du système d'exploitation : </span>{ordinateur.licenseSystemeExploitation}</p>
          <p><span className="font-semibold">Office : </span>{ordinateur.office}</p>
          <p><span className="font-semibold">License Office </span>{ordinateur.licenseOffice}</p>
          <p><span className="font-semibold">Antivirus : </span>{ordinateur.antivirus}</p>
          <p><span className="font-semibold">License antivirus : </span>{ordinateur.licenseAntivirus}</p>
          <p><span className="font-semibold">Utilisateur actuel : </span>{ordinateur.userActuel.prenom} {ordinateur.userActuel.nom}</p>
          <p><span className="font-semibold">Site actuel : </span>{ordinateur.userActuel.site.nom}</p>
          <p><span className="font-semibold">Autres infos : </span>{ordinateur.commentaire}</p>

          {/* Historique en tableau */}
          <div className="mt-4">
            <span className="font-semibold">Historique :</span>
            {ordinateur.historique.length !== 0 ? (
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
                  {ordinateur.historique.map((element, index) => (
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

export default DetailModalOrdinateur;