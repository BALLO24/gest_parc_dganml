import { useState,useEffect } from "react";
// import { data } from "../data/data";
import ItemsParPageOptions from "../components/ItemsParPage";
import SearchBar from "../components/SearchBar";
import { TbListDetails } from "react-icons/tb";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { Link } from "react-router-dom";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { AiFillDelete } from "react-icons/ai";


import API from "../services/API";
import ToastSuccess from "../components/ToastSuccess";
import ConfirmSuppression from "../components/CofirmSuppression";
import { useNavigate } from "react-router-dom";

import NouvelOrdinateur from "../components/NouvelOrdinateur";
import NouvelImprimante from "../components/NouvelImprimante";
import NouvelOnduleur from "../components/NouvelOnduleur";
import NouvelCopieur from "../components/NouvelCopieur";
import NouvelRouteur from "../components/NouvelRouteur";
import NouvelSwitch from "../components/NouvelSwitch";
import NouvelProjecteur from "../components/NouvelProjecteur";
import NouvelControleur from "../components/NouvelControleur";


import DetailModalOrdinateur from "../components/detailModalOrdinateur";
import DetailModalImprimante from "../components/DetailModalImprimante";
import DetailModalCopieur from "../components/DetailModalCopieur";
import DetailModalOnduleur from "../components/DetailModalOnduleur";
import DetailModalRouteur from "../components/DetailModalRouteur";
import DetailModalSwitch from "../components/DetailModalSwitch";
import DetailModalControleur from "../components/DetailModalControleur";
import DetailModalProjecteur from "../components/DetailModalProjecteur";

import ModifOrdinateur from "../components/ModifOrdinateur";
import ModifImprimante from "../components/ModifImprimante";
import ModifCopieur from "../components/ModifCopieur";
import ModifOnduleur from "../components/ModifOnduleur";
import ModifRouteur from "../components/ModifRouteur";
import ModifSwitch from "../components/ModifSwitch";
import ModifControleur from "../components/ModifControleur";
import ModifProjecteur from "../components/ModifProjecteur";

import ReaffectMateriel from "../components/ReaffectMateriel";

export default function MaterielsPage(){
  const [isOpenFormNouvelOrdinateur,setIsOpenFormNouvelOrdinateur]=useState(false);
  const [isOpenFormNouvelImprimante,setIsOpenFormNouvelImprimante]=useState(false);
  const [isOpenFormNouvelCopieur,setIsOpenFormNouvelCopieur]=useState(false);
  const [isOpenFormNouvelOnduleur,setIsOpenFormNouvelOnduleur]=useState(false);
  const [isOpenFormNouvelRouteur,setIsOpenFormNouvelRouteur]=useState(false);
  const [isOpenFormNouvelSwitch,setIsOpenFormNouvelSwitch]=useState(false);
  const [isOpenFormNouvelControleur,setIsOpenFormNouvelControleur]=useState(false);
  const [isOpenFormNouvelProjecteur,setIsOpenFormNouvelProjecteur]=useState(false);

  

  const [isOpenFormModifOrdinateur,setIsOpenFormModifOrdinateur]=useState(false);
  const [isOpenFormModifImprimante,setIsOpenFormModifImprimante]=useState(false);
  const [isOpenFormModifCopieur,setIsOpenFormModifCopieur]=useState(false);
  const [isOpenFormModifOnduleur,setIsOpenFormModifOnduleur]=useState(false);
  const [isOpenFormModifRouteur,setIsOpenFormModifRouteur]=useState(false);
  const [isOpenFormModifSwitch,setIsOpenFormModifSwitch]=useState(false);
  const [isOpenFormModifControleur,setIsOpenFormModifControleur]=useState(false);
  const [isOpenFormModifProjecteur,setIsOpenFormModifProjecteur]=useState(false);


  const [isopenReaffectMateriel,setIsOpenReaffectMateriel]=useState(false)

  const [openDropDownMaterials, setOpenDropDownMaterials] = useState(false);
  const [showSuccessToast, setShowSuccesToast] = useState(false);
  const [isOpenModalSuppr, setIsOpenModalSuppr] = useState(false);
  const [idTodDelete,setIdToDelete]=useState(null);
  const [isDeleting,setIsDeleting]=useState(false);
  const [selectedMateriel,setSelectedMateriel]=useState(null);
  

  const [message,setMessage]=useState();

    const handleCloseFormMateriels=()=>{
        setIsOpenFormNouvelOrdinateur(false);
        setIsOpenFormNouvelImprimante(false);
        setIsOpenFormNouvelOnduleur(false);
        setIsOpenFormNouvelCopieur(false);
        setIsOpenFormNouvelRouteur(false);
        setIsOpenFormNouvelSwitch(false);
        setIsOpenFormNouvelControleur(false);
        setIsOpenFormNouvelProjecteur(false);


        setIsOpenFormModifOrdinateur(false);
        setIsOpenFormModifImprimante(false);
        setIsOpenFormModifCopieur(false);
        setIsOpenFormModifOnduleur(false);
        setIsOpenFormModifRouteur(false);
        setIsOpenFormModifSwitch(false);
        setIsOpenFormModifControleur(false);
        setIsOpenFormModifProjecteur(false);



        setIsOpenReaffectMateriel(false);
    }

     const openModalSuppr = (idMateriel) => {
    setOpenDropdownId(false)
    setIdToDelete(idMateriel)
    setIsOpenModalSuppr(true);
    console.log(idTodDelete);
    
  };
  const openModalModifMateriel=(materiel)=>{
    setOpenDropdownId(false)
    setSelectedMateriel(materiel)
   switch(materiel.__t){
    case "Ordinateur":
        setIsOpenFormModifOrdinateur(true);
        break;
    case "Imprimante":
        setIsOpenFormModifImprimante(true);
        break;
    case "Copieur":
        setIsOpenFormModifCopieur(true);
        break;
    case "Onduleur":
        setIsOpenFormModifOnduleur(true);
        break;
    case "Routeur":
        setIsOpenFormModifRouteur(true);
        break;
    case "Switch":
        setIsOpenFormModifSwitch(true);
        break;
    case "Controleur":
        setIsOpenFormModifControleur(true);
        break;
    case "Projecteur":
        setIsOpenFormModifProjecteur(true);
        break;
        
        
    
  }
  }
    const handleConfirmDelete=async()=>{
     if(!idTodDelete) return ;
     try {
      setIsDeleting(true)
      //await new Promise(resolve=>setTimeout(resolve,2000));
      await API.deleteMateriel(idTodDelete);
      const res=await API.getMateriels();
      setMateriels(res.materiels || []);
      setMessage("Materiel supprimé avec succès");
      handleCloseModalSuppr();
      setShowSuccesToast(true);
      setTimeout(() => setShowSuccesToast(false), 4000);
      setIsDeleting(false)
  
     }
     
     catch(err){
      console.log(err);
      setIsDeleting(false)
      
     }
      
    }

    const openModalReaffectMateriel=(item)=>{
      setOpenDropdownId(false)
      setIsOpenReaffectMateriel(true);
      setSelectedMateriel(item);
      console.log(selectedMateriel);
      
    }
      const handleCloseModalSuppr = () => {setIsOpenModalSuppr(false)};

  

    const handleSuccess = async (successMessage) => {
    handleCloseFormMateriels()
    navigate("/app/materiels");
        try {
            const res = await API.getMateriels();
            setMateriels(res.materiels || []);
        } 
        catch (err) {
            console.error("Erreur rechargement de materiels:", err);
        }
        //setMessage("Materiel ajouté avec succès")
        setMessage(successMessage)
        setShowSuccesToast(true);
        setTimeout(() => setShowSuccesToast(false), 4000);
    };
    
  

  const handleSelectNouveauMateriel = (type) => {
    setOpenDropDownMaterials(false)
      switch(type){
        case "ordinateur":
          setIsOpenFormNouvelOrdinateur(true);
          break;
        case "imprimante":
          setIsOpenFormNouvelImprimante(true);
          break;
          case "copieur":
            setIsOpenFormNouvelCopieur(true);
            break;
        case "onduleur":
          setIsOpenFormNouvelOnduleur(true);
          break;
        case "routeur":
          setIsOpenFormNouvelRouteur(true);
          break;
        case "switch":
          setIsOpenFormNouvelSwitch(true);
          break;
        case "controleur":
          setIsOpenFormNouvelControleur(true);
          break;
        case "projecteur":
          setIsOpenFormNouvelProjecteur(true);
          break;


      }
  };
    const [materiels,setMateriels]=useState([])
    useEffect(() => {
    const load = async () => {
        try {
        const res = await API.getMateriels();
        
        setMateriels(res.materiels || []);        
        } catch (err) {
        console.error("Erreur chargement users:", err);
        setMateriels([]);
        }
    };
    load();
    }, []);

        const [openDropdownId, setOpenDropdownId] = useState(null);


        const toggleDropdown = (id) => {
          setOpenDropdownId(openDropdownId === id ? null : id);
        };


        //Etat de la pagination
        const [currentPage, setCurrentPage]=useState(1);
        const [itemsPerPage,setItemPerPage]=useState(5);
        const [searchTerm,setSearchTerm]=useState("");
        const [filteredData,setFilteredData]=useState(materiels)
        //Calcul des données à afficher
        const indexOfLastItem=currentPage*itemsPerPage;
        const indexOfFirstItem=indexOfLastItem-itemsPerPage;
        // const currentItems=data.slice(indexOfFirstItem,indexOfLastItem);
        const currentItems=filteredData.slice(indexOfFirstItem,indexOfLastItem);
        // const totalPages=Math.ceil(data.length/itemsPerPage);
        const totalPages=Math.ceil(filteredData.length/itemsPerPage);
    
        //fonction pour changer de page
        const paginate=(pageNumber)=>setCurrentPage(pageNumber);
    
        useEffect(()=>{
            const term = (searchTerm || "").trim().toLowerCase();
            if (!term) {
            setFilteredData(materiels);
            setCurrentPage(1);
            return;
            }

            const filtered=materiels.filter(item => 
                Object.values(item).some(
                    val=>val.toString().toLowerCase().includes(searchTerm.toLowerCase())))
                    console.log(filtered);
                    
                setFilteredData(filtered);
                setCurrentPage(1);
            },[searchTerm,materiels])

            const [isOpenDetailOrdinateur,setIsOpenDetailOrdinateur]=useState(false)
            const [isOpenDetailImprimante,setIsOpenDetailImprimante]=useState(false);
            const [isOpenDetailCopieur,setIsOpenDetailCopieur]=useState(false);
            const [isOpenDetailOnduleur,setIsOpenDetailOnduleur]=useState(false);
            const [isOpenDetailRouteur,setIsOpenDetailRouteur]=useState(false);
            const [isOpenDetailSwitch,setIsOpenDetailSwitch]=useState(false);
            const [isOpenDetailControleur,setIsOpenDetailControleur]=useState(false);
            const [isOpenDetailProjecteur,setIsOpenDetailProjecteur]=useState(false);
            
            const handleClose=()=>{
                setIsOpenDetailOrdinateur(false);
                setIsOpenDetailImprimante(false);
                setIsOpenDetailCopieur(false);
                setIsOpenDetailOnduleur(false);
                setIsOpenDetailRouteur(false);
                setIsOpenDetailSwitch(false);
                setIsOpenDetailControleur(false);
                setIsOpenDetailProjecteur(false);


                setIsOpenFormModifOrdinateur(false);
                setIsOpenFormModifImprimante(false);
                setIsOpenFormModifCopieur(false);
                setIsOpenFormModifOnduleur(false);
                setIsOpenFormModifRouteur(false);
                setIsOpenFormModifSwitch(false);
                setIsOpenFormNouvelControleur(false);
                setIsOpenFormModifProjecteur(false);

                setIsOpenReaffectMateriel(false);
            }
            
            const openDetailMaterial=(materiel)=>{
              //console.log(materiel);
              
                 setOpenDropdownId(false);
                setSelectedMateriel(materiel);
                console.log("selected materiel",selectedMateriel);
                
                switch(materiel.__t){
                    case "Ordinateur":
                        setIsOpenDetailOrdinateur(true);
                        break;
                    case "Imprimante":
                        setIsOpenDetailImprimante(true);                        
                        break;
                    case "Copieur":
                        setIsOpenDetailCopieur(true);                        
                        break;
                    case "Onduleur":
                        setIsOpenDetailOnduleur(true);                        
                        break;
                    case "Routeur":
                        setIsOpenDetailRouteur(true);                        
                        break;
                    case "Switch":
                        setIsOpenDetailSwitch(true);                        
                        break;
                    case "Controleur":
                        setIsOpenDetailControleur(true);                        
                        break;
                    case "Projecteur":
                        setIsOpenDetailProjecteur(true);                        
                        break;
                }
            }


             const navigate = useNavigate();
    return(
        <>
           <div className="relative  p-4 max-w-full overflow-hidden ">
        <ConfirmSuppression isOpen={isOpenModalSuppr} onClose={handleCloseModalSuppr}  isDeleting={isDeleting} onConfirm={handleConfirmDelete} />

                <div className="z-50 fixed right-4 top-24 inline-block text-left text-sm">
      {/* Bouton principal */}
      <button
        onClick={() => setOpenDropDownMaterials(!openDropDownMaterials)}
        className="px-2 py-2 font-bold rounded-sm bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow hover:opacity-90"
      >
        + Ajouter
      </button>

      {/* Menu déroulant */}
      {openDropDownMaterials && (
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
                onClick={() => handleSelectNouveauMateriel("copieur")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Copieur
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
                onClick={() => handleSelectNouveauMateriel("routeur")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Routeur
              </button>
              <button
                onClick={() => handleSelectNouveauMateriel("switch")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Switch
              </button>
              <button
                onClick={() => handleSelectNouveauMateriel("controleur")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Controleur
              </button>
                            <button
                onClick={() => handleSelectNouveauMateriel("projecteur")}
                className="w-full text-left px-4 py-2 hover:bg-gray-300"
              >
                Projecteur
              </button>

              
            </li>
          </ul>
        </div>
      )}
    <NouvelOrdinateur isOpenFormNouvelOrdinateur={isOpenFormNouvelOrdinateur} closeFormNouvelOrdinateur={()=>handleCloseFormMateriels()} onSuccess={(message)=>handleSuccess(message)}/>
    <NouvelImprimante isOpenFormNouvelImprimante={isOpenFormNouvelImprimante} closeFormNouvelImprimante={()=>handleCloseFormMateriels()} onSuccess={(message)=>handleSuccess(message)}/>
    <NouvelCopieur isOpenFormNouvelCopieur={isOpenFormNouvelCopieur} closeFormNouvelCopieur={()=>handleCloseFormMateriels()} onSuccess={(message)=>handleSuccess(message)}/>
    <NouvelOnduleur isOpenFormNouvelOnduleur={isOpenFormNouvelOnduleur} closeFormNouvelOnduleur={()=>handleCloseFormMateriels()} onSuccess={(message)=>handleSuccess(message)}/>
    <NouvelRouteur isOpenFormNouvelRouteur={isOpenFormNouvelRouteur} closeFormNouvelRouteur={()=>handleCloseFormMateriels()} onSuccess={(message)=>handleSuccess(message)}/>
    <NouvelSwitch isOpenFormNouvelSwitch={isOpenFormNouvelSwitch} closeFormNouvelSwitch={()=>handleCloseFormMateriels()} onSuccess={(message)=>handleSuccess(message)}/>
    <NouvelControleur isOpenFormNouvelControleur={isOpenFormNouvelControleur} closeFormNouvelControleur={()=>handleCloseFormMateriels()} onSuccess={(message)=>handleSuccess(message)}/>
    <NouvelProjecteur isOpenFormNouvelProjecteur={isOpenFormNouvelProjecteur} closeFormNouvelProjecteur={()=>handleCloseFormMateriels()} onSuccess={(message)=>handleSuccess(message)}/>
    </div>

                <ItemsParPageOptions
                    value={itemsPerPage}
                    onChange={(value)=>{
                        setItemPerPage(value);
                        setCurrentPage(1)
                    }}
                    options={[5,10,20,50,100]}
                    className=" w-full md:w-max-md"

                />
                <SearchBar 
                    value={searchTerm}
                    onChange={(value=>{
                        setSearchTerm(value);
                        setCurrentPage(1);
                    })}
                    className=""
                />
                {/* <button onClick={()=>openFormNewMaterial()} className="absolute right-8 top-10 flex items-center gap-1 px-2 py-1 rounded-md bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white font-semibold shadow-lg transform transition-all duration-300 hover:from-green-500 hover:via-green-600 hover:to-green-800 hover:shadow-xl hover:-translate-y-1 active:scale-95">
                    <FaPlus className="w-5 h-5"/> Ajouter
                </button> */}

                {/* Desktop-Version */}
                <div className="hidden md:block">
                    <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">No</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Marque</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Modele</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">No Serie</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Propriétaire</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Site</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Etat</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        
                        <tbody className=" divide-y divide-gray-200 bg-white ">
                            {currentItems.map((item,idx)=>(
                                <tr key={item._id ?? idx}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{indexOfFirstItem + idx + 1}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.__t}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.marque}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.modele}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.noSerie}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.userActuel.prenom} {" "} {item.userActuel.nom}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.userActuel.site.nom}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.etat}</td>
                                    <td className="px-6 py-2 whitespace-nowrap text-gray-600">
                                        <div className="relative inline-block text-left">
                                            <div>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    onClick={() => toggleDropdown(item._id)}
                                                >
                                                    Actions
                                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {openDropdownId === item._id && (
                                            <div className=" fixed mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                                                <div className="py-1 z-50">
                                                <button
                                                    onClick={()=>openDetailMaterial(item)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <TbListDetails className="mr-1 text-xl" />Détails
                                                </button>
                                                <Link to=""
                                                    onClick={()=>openModalModifMateriel(item)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                <MdOutlinePublishedWithChanges
                                                    className="mr-1 text-xl"/>Modifier
                                                </Link>
                                                <Link to=""
                                                    onClick={() => openModalReaffectMateriel(item)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                <LiaExchangeAltSolid  className="mr-1 text-xl"/>Reaffectation
                                                </Link>
                                                <Link to=""
                                                    // onClick={() => handleAction(item.id, 'Modifier')}
                                                    onClick={()=>openModalSuppr(item._id)}
                                                    className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
                                                >
                                                <AiFillDelete className="mr-1 text-xl "/>Supprimer
                                                </Link>
                                                </div>
                                            </div>
                                                )}
                                        </div>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                                {/* Version mobile */}
                <div className="md:hidden space-y-4">
                    {
                        currentItems.map((item,idx)=>(
                            <div key={item._id ?? idx} className="bg-white shadow-xl border border-gray-300 overflow-hidden rounded-lg p-4">
                                <div className="grid grid-cols-2 gap-2 ">
                                    <div className="text-sm font-medium text-gray-500">No</div>
                                    <div className="text-sm text-gray-900">{indexOfFirstItem + idx + 1}</div>
    
                                    <div className="text-sm font-medium text-gray-500">Type</div>
                                    <div className="text-sm text-gray-900">{item.__t}</div>
    
                                    <div className="text-sm font-medium text-gray-500">Marque</div>
                                    <div className="text-sm text-gray-900">{item.marque}</div>

                                    <div className="text-sm font-medium text-gray-500">Modèle</div>
                                    <div className="text-sm text-gray-900">{item.modele}</div>

                                    <div className="text-sm font-medium text-gray-500">No Série</div>
                                    <div className="text-sm text-gray-900">{item.noSerie}</div>
                                    
                                    <div className="text-sm font-medium text-gray-500">Propriétaire</div>
                                    <div className="text-sm text-gray-900">{item.userActuel.prenom} {" "} {item.userActuel.nom}</div>

                                    <div className="text-sm font-medium text-gray-500">Site</div>
                                    <div className="text-sm text-gray-900">{item.userActuel.site.nom}</div>

                                    <div className="text-sm font-medium text-gray-500">Etat</div>
                                    <div className="text-sm text-gray-900">{item.etat}</div>

                                    <div className="text-sm font-medium text-gray-500">Action</div>
                                    <div className="text-gray-900">
                                            {openDropdownId === item._id && (
                                            <div className=" fixed mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                                                <div className="py-1 z-50">
                                                <button
                                                    onClick={()=>openDetailMaterial(item)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <TbListDetails className="mr-1 text-xl" />Détails
                                                </button>
                                                <Link to=""
                                                    onClick={()=>openModalModifMateriel(item)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                <MdOutlinePublishedWithChanges
                                                    className="mr-1 text-xl"/>Modifier
                                                </Link>
                                                <Link to=""
                                                    onClick={() => openModalReaffectMateriel(item)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                <LiaExchangeAltSolid  className="mr-1 text-xl"/>Reaffectation
                                                </Link>
                                                <Link to=""
                                                    // onClick={() => handleAction(item.id, 'Modifier')}
                                                    onClick={()=>openModalSuppr(item._id)}
                                                    className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
                                                >
                                                <AiFillDelete className="mr-1 text-xl "/>Supprimer
                                                </Link>
                                                </div>
                                            </div>
                                                )}
                                    </div>
    
                                </div>
                            </div>
                        ))
                    }
                </div>




                            {/* Pagination */}
                <div className="flex flex-center justify-between mt-4 mx-4 ">
                    <div className="text-sm text-gray-700 font-semibold">
                        Affichage de <span>{indexOfFirstItem + 1}</span> à {" "}
                        <span className="font-medium">{Math.min(indexOfLastItem,filteredData.length)}</span> sur {" "}
                        <span className="font-medium">{filteredData.length}</span> {" "} resultats
                    </div>
                </div>
    
                <div className="flex space-x-2 m-2">
                    <button
                        onClick={()=>paginate(Math.max(1,currentPage - 1))}
                        disabled={currentPage===1}
                        className={`px-3 py-1 m-2 rounded-md ${currentPage===1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                        Précedent
                    </button>
    
                    {
                        Array.from({length:totalPages},(_, i)=> i + 1).map((number)=>
                            <button
                                key={number}
                                onClick={()=>paginate(number)}
                                className={`m-2 px-3 py-1 rounded-md ${currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} `}
                            >
                                {number}
                            </button>
                        )
                    }
    
                    <button
                        onClick={()=>paginate(Math.min(totalPages,currentPage + 1))}
                        disabled={currentPage===totalPages}
                        className={`px-3 py-1 m-2 rounded-md ${currentPage===totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                        Suivant
                    </button>
                </div>

           </div>
            {showSuccessToast && <ToastSuccess message={message || "Operation effectuée avec succes"} />}

           <DetailModalOrdinateur isOpenModalInfo={isOpenDetailOrdinateur} onCloseModalInfo={handleClose} ordinateur={selectedMateriel}/>
           <DetailModalImprimante isOpenModalInfo={isOpenDetailImprimante} onCloseModalInfo={handleClose} imprimante={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>
           <DetailModalCopieur isOpenModalInfo={isOpenDetailCopieur} onCloseModalInfo={handleClose} copieur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>
           <DetailModalOnduleur isOpenModalInfo={isOpenDetailOnduleur} onCloseModalInfo={handleClose} onduleur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>
           <DetailModalRouteur isOpenModalInfo={isOpenDetailRouteur} onCloseModalInfo={handleClose} routeur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>
            <DetailModalSwitch isOpenModalInfo={isOpenDetailSwitch} onCloseModalInfo={handleClose} switchs={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>
           <DetailModalControleur isOpenModalInfo={isOpenDetailControleur} onCloseModalInfo={handleClose} controleur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>
           <DetailModalProjecteur isOpenModalInfo={isOpenDetailProjecteur} onCloseModalInfo={handleClose} projecteur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>
           
           <ModifOrdinateur isOpenFormModifOrdinateur={isOpenFormModifOrdinateur} closeFormModifOrdinateur={handleClose} ordinateur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>           
           <ModifImprimante isOpenFormModifImprimante={isOpenFormModifImprimante} closeFormModifImprimante={handleClose} imprimante={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>           
           <ModifCopieur isOpenFormModifCopieur={isOpenFormModifCopieur} closeFormModifCopieur={handleClose} copieur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>           
           <ModifOnduleur isOpenFormModifOnduleur={isOpenFormModifOnduleur} closeFormModifOnduleur={handleClose} onduleur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>           
           <ModifRouteur isOpenFormModifRouteur={isOpenFormModifRouteur} closeFormModifRouteur={handleClose} routeur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>           
           <ModifSwitch isOpenFormModifSwitch={isOpenFormModifSwitch} closeFormModifSwitch={handleClose} switchs={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>           
           <ModifControleur isOpenFormModifControleur={isOpenFormModifControleur} closeFormModifControleur={handleClose} controleur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>           
           <ModifProjecteur isOpenFormModifProjecteur={isOpenFormModifProjecteur} closeFormModifProjecteur={handleClose} projecteur={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>           
           
           <ReaffectMateriel isOpenModalInfo={isopenReaffectMateriel} onCloseModalInfo={handleClose} materiel={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>
        </>
    )
}