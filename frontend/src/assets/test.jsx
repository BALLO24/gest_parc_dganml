/*
  DetailModalMateriel - exemple corrigé
  - Composant parent avec bouton d'ouverture (type="button")
  - Modal rendu via createPortal pour éviter problèmes de z-index/nesting
  - Verrous: bloque le scroll du body quand la modal est ouverte
  - Gestion de la touche Escape pour fermer
  - Quelques console.log() pour aider au debug

  Colle ce fichier dans ton projet (par ex. src/components/ModalExample.jsx)
*/

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TbListDetails } from 'react-icons/tb';

const DetailModalMateriel = ({ isOpenModalInfo, onCloseModalInfo, selectedMateriel }) => {
  // Bloque le scroll de la page quand la modal est ouverte
  useEffect(() => {
    if (isOpenModalInfo) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpenModalInfo]);

  // Fermer avec Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onCloseModalInfo(); };
    if (isOpenModalInfo) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpenModalInfo, onCloseModalInfo]);

  if (!isOpenModalInfo) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onCloseModalInfo()} // clique sur le backdrop ferme
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-xl transform transition-all"
        onClick={(e) => e.stopPropagation()} // empêche la propagation pour le contenu
      >
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
          <div className="flex items-center">
            <TbListDetails className="text-2xl mr-2" />
            <h3 className="text-lg font-semibold">Informations supplémentaires</h3>
          </div>
          <button type="button" onClick={onCloseModalInfo} aria-label="Fermer" className="text-white font-bold">
            ✕
          </button>
        </div>

        <div className="p-6 text-gray-700 text-sm">
          {selectedMateriel ? (
            <>
              <p><span className="font-semibold">Type :</span> {selectedMateriel.type}</p>
              <p><span className="font-semibold">Marque :</span> {selectedMateriel.marque}</p>
              <p><span className="font-semibold">Modèle :</span> {selectedMateriel.modele}</p>
              <p><span className="font-semibold">N° série :</span> {selectedMateriel.serial}</p>
              <p><span className="font-semibold">Date d'acquisition :</span> {selectedMateriel.dateAcquisition}</p>
              <p><span className="font-semibold">État :</span> {selectedMateriel.etat}</p>
              <p><span className="font-semibold">Utilisateur :</span> {selectedMateriel.utilisateur}</p>
              <p><span className="font-semibold">Autres infos :</span> {selectedMateriel.autres}</p>
            </>
          ) : (
            <p>Aucun matériel sélectionné.</p>
          )}
        </div>

        <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
          <button
            type="button"
            onClick={onCloseModalInfo}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-red-400 via-red-500 to-red-800 text-white shadow"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default function ModalExample() {
  const sample = [
    {
      id: 1,
      type: 'Ordinateur',
      marque: 'Lenovo',
      modele: 'ThinkPad i5 12th',
      serial: 'MP2BACFAM1',
      dateAcquisition: '2018-06-12',
      etat: 'Excellent',
      utilisateur: 'Lassine KONATE',
      autres: 'Ex: historique: Michel, Diarra, Boubacar'
    },
    { id: 2, type: 'Imprimante', marque: 'HP', modele: 'LaserJet', serial: 'HP-12345', dateAcquisition: '2019-01-01', etat: 'Bon', utilisateur: 'Diarra S.', autres: '' }
  ];

  const [isOpenDetailMateriel, setIsOpenDetailMateriel] = useState(false);
  const [selectedMateriel, setSelectedMateriel] = useState(null);

  const handleOpen = (materiel) => {
    console.log('open modal ->', materiel);
    setSelectedMateriel(materiel);
    setIsOpenDetailMateriel(true);
  };

  const handleClose = () => {
    console.log('closing modal');
    setIsOpenDetailMateriel(false);
    setSelectedMateriel(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste du matériel (exemple)</h2>

      <div className="space-y-2">
        {sample.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-3 border rounded">
            <div>
              <div className="font-semibold">{m.type} - {m.marque}</div>
              <div className="text-sm text-gray-600">{m.modele}</div>
            </div>
            <div>
              {/* IMPORTANT: type="button" si le bouton est dans un <form> pour éviter submit */}
              <button type="button" onClick={() => handleOpen(m)} className="px-3 py-1 rounded bg-blue-600 text-white">
                Voir
              </button>
            </div>
          </div>
        ))}
      </div>

      <DetailModalMateriel
        isOpenModalInfo={isOpenDetailMateriel}
        onCloseModalInfo={handleClose}
        selectedMateriel={selectedMateriel}
      />
    </div>
  );
}
