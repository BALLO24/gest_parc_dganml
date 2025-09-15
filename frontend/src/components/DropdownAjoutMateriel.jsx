import { useState } from "react";
import NouvelOrdinateur from "./NouvelOrdinateur";
import NouvelImprimante from "./NouvelImprimante";
import NouvelOnduleur from "./NouvelOnduleur";
const DropdownAjoutMateriel = () => {
  const [open, setOpen] = useState(false);


  const [isOpenFormNouvelOrdinateur,setIsOpenFormNouvelOrdinateur]=useState(false);
  const [isOpenFormNouvelImprimante,setIsOpenFormNouvelImprimante]=useState(false)
  const [isOpenFormNouvelOnduleur,setIsOpenFormNouvelOnduleur]=useState(false)


    const handleCloseFormNouvelOrdinateur=()=>{
        setIsOpenFormNouvelOrdinateur(false)
    }
    const handleCloseFormNouvelImprimante=()=>{
        setIsOpenFormNouvelImprimante(false)
    }
        const handleCloseFormNouvelOnduleur=()=>{
        setIsOpenFormNouvelOnduleur(false)
    }

  
  

  const handleSelectNouveauMateriel = (type) => {
    // onSelect(type); // remonte le choix au parent
    // setOpen(false);
    console.log(type);
    setOpen(false)
    // if(type==="ordinateur"){
    //     setIsOpenFormNouvelOrdinateur(true)
    // }
    // else
      switch(type){
        case "ordinateur":
          setIsOpenFormNouvelOrdinateur(true);
          break;
        case "imprimante":
          setIsOpenFormNouvelImprimante(true);
          break;
        case "onduleur":
          setIsOpenFormNouvelOnduleur(true);
          break;
      }
  };

  return (
    <div className="fixed right-5 top-24 inline-block text-left text-sm">
      {/* Bouton principal */}
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-2 font-bold rounded-sm bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow hover:opacity-90"
      >
        + Ajouter
      </button>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute right-0 mt-1 w-32  bg-gray-50  rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <ul className="py-2">
            <li>
              <button
                onClick={() => handleSelectNouveauMateriel("ordinateur")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Ordinateur
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSelectNouveauMateriel("imprimante")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Imprimante
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSelectNouveauMateriel("onduleur")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Onduleur
              </button>
              <button
                onClick={() => handleSelectNouveauMateriel("onduleur")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Routeur
              </button>
              <button
                onClick={() => handleSelectNouveauMateriel("onduleur")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Switch
              </button>
              <button
                onClick={() => handleSelectNouveauMateriel("onduleur")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Controleur
              </button>
                            <button
                onClick={() => handleSelectNouveauMateriel("onduleur")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Projecteur
              </button>

              
            </li>
          </ul>
        </div>
      )}
    <NouvelOrdinateur isOpenFormNouvelOrdinateur={isOpenFormNouvelOrdinateur} closeFormNouvelOrdinateur={handleCloseFormNouvelOrdinateur}/>
    <NouvelImprimante isOpenFormNouvelImprimante={isOpenFormNouvelImprimante} closeFormNouvelImprimante={handleCloseFormNouvelImprimante}/>
    <NouvelOnduleur isOpenFormNouvelOnduleur={isOpenFormNouvelOnduleur} closeFormNouvelOnduleur={handleCloseFormNouvelOnduleur}/>

    </div>
  );
};

export default DropdownAjoutMateriel;
