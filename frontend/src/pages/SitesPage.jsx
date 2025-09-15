import { useState, useEffect } from "react";
import ItemsParPageOptions from "../components/ItemsParPage";
import NouveauSite from "../components/NouveauSite";
import SearchBar from "../components/SearchBar";
import { AiFillDelete } from "react-icons/ai";
import ConfirmSuppression from "../components/CofirmSuppression";
import ToastSuccess from "../components/ToastSuccess";
import { useNavigate } from "react-router-dom";

import API from "../services/API";
//import { SiTestin, SiTestinglibrary } from "react-icons/si";

export default function SitesPage() {
  // données
  const [sites, setSites] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // pagination / recherche / UI
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
    
const [isOpenFormNouveauSite,setisOpenFormNouveauSite]=useState(false);


  // modals / toasts
  const [isOpenModalSuppr, setIsOpenModalSuppr] = useState(false);
  const [showSuccessToast, setShowSuccesToast] = useState(false);
  const [idTodDelete,setIdToDelete]=useState(null);
  const [isDeleting,setIsDeleting]=useState(false)
  const [message,setMessage]=useState("Opération éffectuée avec succès");

  const navigate = useNavigate();

  // --- load agents ---
  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.getSites();
        setSites(res.sites || []);
      } catch (err) {
        console.error("Erreur chargement users:", err);
        setSites([]);
      }
    };
    load();
  }, []);

  // --- filtrage : recalculer quand searchTerm OU utilisateurs changent ---
  useEffect(() => {
    const term = (searchTerm || "").trim().toLowerCase();

    if (!term) {
      setFilteredData(sites);
      setCurrentPage(1);
      return;
    }

    const filtered = sites.filter((item) =>
      Object.values(item).some((val) => (val ?? "").toString().toLowerCase().includes(term))
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, sites]);

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
    setisOpenFormNouveauSite(false);
    setIsOpenModalSuppr(false)
  };
 const openFormNouvelSite = () => setisOpenFormNouveauSite(true);
  const handleSuccess = async () => {
    handleClose();
    navigate("/app/sites");
     try {
    const res = await API.getSites();
    setSites(res.sites || []);
  } catch (err) {
    console.error("Erreur rechargement de sites:", err);
  }
    setMessage("Site créé avec succès !")
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
    await API.deleteSite(idTodDelete);
    const res=await API.getSites();
    setSites(res.sites || []);
    setMessage("Site supprimé avec succès");
    setShowSuccesToast(true);
    setTimeout(() => setShowSuccesToast(false), 4000);
    setIsDeleting(false)

   }
   
   catch(err){
    console.log(err);
    
   }
    
  }
  const handleCloseModalSuppr = () => setIsOpenModalSuppr(false);

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
          onClick={() => openFormNouvelSite()}
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
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Type de site</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>

            <tbody className=" divide-y divide-gray-200 bg-white ">
              {currentItems.map((item, idx) => (
                <tr key={item._id ?? idx}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{indexOfFirstItem + idx + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.nom}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.typeSite}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-gray-600">
                    <button
                      onClick={() => openModalSuppr(item._id)}
                      className="flex items-center px-2 py-2 text-sm font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-800 shadow-lg text-white rounded-md hover:bg-gray-100  text-center"
                    >
                      <AiFillDelete className="mr-1 text-xl " />Supprimer
                    </button>
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
        <NouveauSite isOpenFormNouveauSite={isOpenFormNouveauSite} closeFormNouveauSite={handleClose} onSuccess={handleSuccess}/>
        {showSuccessToast && <ToastSuccess message={message} />}

        <ConfirmSuppression isOpen={isOpenModalSuppr} onClose={handleClose}  isDeleting={isDeleting} onConfirm={handleConfirmDelete} />
      </div>
    </>
  );
}
