import { useState, useEffect } from "react";
import ItemsParPageOptions from "../components/ItemsParPage";
import NouvelAgent from "../components/NouvelAgent";
import SearchBar from "../components/SearchBar";
import { AiFillDelete } from "react-icons/ai";
import ConfirmSuppression from "../components/CofirmSuppression";
import ToastSuccess from "../components/ToastSuccess";
import {  useNavigate } from "react-router-dom";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import ListeMaterielsAgent from "../components/ListeMaterielsAgent";


import API from "../services/API";
import { FaComputer } from "react-icons/fa6";
//import { SiTestin, SiTestinglibrary } from "react-icons/si";

export default function AgentsPage() {
  // données
  const [agents, setAgents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [idAgent,setIdAgent]=useState();

  // pagination / recherche / UI
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
    
const [isOpenFormNouvelAgent,setisOpenFormNouvelAgent]=useState(false);


  // modals / toasts
  const [isOpenModalSuppr, setIsOpenModalSuppr] = useState(false);
  const [showSuccessToast, setShowSuccesToast] = useState(false);
  const [idTodDelete,setIdToDelete]=useState(null);
  const [isDeleting,setIsDeleting]=useState(false)
  const [message,setMessage]=useState("Opération éffectuée avec succès");
  const [isOpenListeMaterielAgent,setIsOpenMaterielAgent]=useState(false);
  const [materielsAgent,setMaterielsAgent]=useState([])
  const navigate = useNavigate();

  // --- load users ---
  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.getAgents();
        setAgents(res.agents || []);
      } catch (err) {
        console.error("Erreur chargement users:", err);
        setAgents([]);
      }
    };
    load();
  }, []);

          const [openDropdownId, setOpenDropdownId] = useState(null);


        const toggleDropdown = (id) => {
          setOpenDropdownId(openDropdownId === id ? null : id);
        }

  // --- filtrage : recalculer quand searchTerm OU utilisateurs changent ---
  useEffect(() => {
    const term = (searchTerm || "").trim().toLowerCase();

    if (!term) {
      setFilteredData(agents);
      setCurrentPage(1);
      return;
    }

    const filtered = agents.filter((item) =>
      Object.values(item).some((val) => (val ?? "").toString().toLowerCase().includes(term))
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, agents]);

  // --- pagination calculs ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (filteredData || []).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = filteredData.length > 0 ? Math.ceil(filteredData.length / itemsPerPage) : 1;
  const displayStart = filteredData.length === 0 ? 0 : indexOfFirstItem + 1;
  const displayEnd = Math.min(indexOfLastItem, filteredData.length);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- handlers UI ---
  const handleClose = () => {
    setisOpenFormNouvelAgent(false);
    setIsOpenModalSuppr(false);
    setIsOpenMaterielAgent(false);

  };
 const openFormNouvelAgent = () => setisOpenFormNouvelAgent(true);
  const handleSuccess = async () => {
    handleClose();
    navigate("/app/agents");
     try {
    const res = await API.getAgents();
    setAgents(res.agents || []);
  } catch (err) {
    console.error("Erreur rechargement de agents:", err);
  }
    setMessage("Agent créé avec succès !")
    setShowSuccesToast(true);
    setTimeout(() => setShowSuccesToast(false), 4000);
  };

  const openModalSuppr = (idUser) => {
    setIdToDelete(idUser)
    setIsOpenModalSuppr(true);
    console.log(idTodDelete);
    
  };

  const handleConfirmDelete=async()=>{
   if(!idTodDelete) return ;
   try {
    setIsDeleting(true)
    await new Promise(resolve=>setTimeout(resolve,2000));
    handleCloseModalSuppr();
    await API.deleteAgent(idTodDelete);
    const res=await API.getAgents();
    setAgents(res.agents || []);
    setMessage("Agent supprimé avec succès !");
    setShowSuccesToast(true);
    setTimeout(() => setShowSuccesToast(false), 4000);
    setIsDeleting(false)

   }
   
   catch(err){
    console.log(err);
    
   }
    
  }
  const handleCloseModalSuppr = () => setIsOpenModalSuppr(false);

  const openListeMaterielsAgent=async (idAgent)=>{
        try{
            setIdAgent(idAgent)
            setIsOpenMaterielAgent(true);
            const res=await API.getListeMaterielsAgent(idAgent);
            setMaterielsAgent(res.materiels || []);
        }
        catch(err){
          console.error(err);
          
        }
    }


  return (
    <>
      <div className="relative p-4 max-w-full overflow-hidden ">
        <ItemsParPageOptions
          value={itemsPerPage}
          onChange={(value) => {
            setItemPerPage(value);
            setCurrentPage(1);
          }}
          options={[5, 10, 20, 50, 100]}
          className=" w-full md:w-max-md"
        />

        <SearchBar
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          className=""
        />

        <button
          onClick={() => openFormNouvelAgent()}
          className="px-2 py-2 absolute right-10 top-4 font-bold rounded-sm bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow hover:opacity-90"
        >
          + Ajouter
        </button>

        {/* Desktop-Version */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">No</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Matricule</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Prénom</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Site</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Type de Site</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Téléphone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>

            <tbody className=" divide-y divide-gray-200 bg-white ">
              {currentItems.map((item, idx) => (
                <tr key={item._id ?? idx}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{indexOfFirstItem + idx + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.matricule}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.prenom}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.nom}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item?.site.nom || "-"}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 capitalize ">{item.site?.typeSite || "-"}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.telephone}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.email}</td>
                  
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

                    {/* <button
                      onClick={() => openModalSuppr(item._id)}
                      className="flex items-center px-2 py-2 text-sm font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-800 shadow-lg text-white rounded-md hover:bg-gray-100  text-center"
                    >
                      <AiFillDelete className="mr-1 text-xl " />Supprimer
                    </button> */}
                    {openDropdownId === item._id && (
                    <div className=" fixed mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                        <div className="py-1 z-50">
                        <button onClick={()=>openListeMaterielsAgent(item._id)} 
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                        <FaComputer  className="mr-1 text-xl"/>Matériels
                        </button>
                        {/* <Link to=""
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                        <LiaExchangeAltSolid  className="mr-1 text-xl"/>Reaffectation
                        </Link> */}
                        <button to=""
                            // onClick={() => handleAction(item.id, 'Modifier')}
                            onClick={()=>openModalSuppr(item._id)}
                            className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
                        >
                        <AiFillDelete className="mr-1 text-xl "/>Supprimer
                        </button>
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

        {/* Pagination */}
        <div className="flex flex-center justify-between mt-4 mx-4 ">
          <div className="text-sm text-gray-700 font-semibold">
            Affichage de <span>{displayStart}</span> à <span className="font-medium">{displayEnd}</span> sur <span className="font-medium">{filteredData.length}</span> résultats
          </div>
        </div>

        <div className="flex space-x-2 m-2">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 m-2 rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Précedent
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`m-2 px-3 py-1 rounded-md ${currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} `}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 m-2 rounded-md ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Suivant
          </button>
        </div>
{/* 
        {isOpenFormNouvelUtilisateur && (
          <NouvelUtilisateur isOpenFormNouvelUtilisateur={isOpenFormNouvelUtilisateur} closeFormNouvelUtilisateur={handleClose} onSuccess={handleSuccess} />
        )} */}
        <NouvelAgent isOpenFormNouvelAgent={isOpenFormNouvelAgent} closeFormNouvelAgent={handleClose} onSuccess={handleSuccess}/>
        {showSuccessToast && <ToastSuccess message={message} />}
        <ListeMaterielsAgent isOpenModalInfo={isOpenListeMaterielAgent} onCloseModalInfo={handleClose} idAgent={idAgent} liste={materielsAgent}/>
        <ConfirmSuppression isOpen={isOpenModalSuppr} onClose={handleClose}  isDeleting={isDeleting} onConfirm={handleConfirmDelete} />
      </div>
    </>
  );
}
