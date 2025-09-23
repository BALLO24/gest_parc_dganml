import { useState, useEffect } from "react";
import ItemsParPageOptions from "../components/ItemsParPage";
import NouveauGfu from "../components/NouveauGfu";
import ReaffectGFU from "../components/ReaffectGFU";
import SearchBar from "../components/SearchBar";
import { AiFillDelete } from "react-icons/ai";
import ConfirmSuppression from "../components/CofirmSuppression";
import ToastSuccess from "../components/ToastSuccess";
import { useNavigate,Link } from "react-router-dom";
import { LiaExchangeAltSolid } from "react-icons/lia";


import API from "../services/API";

export default function GFUPage() {
  // données
  const [numsGfu, setNumsGfu] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // pagination / recherche / UI
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
    
const [isOpenFormNouveauGfu,setIsOpenFormNouveauGfu]=useState(false);
  const [isopenReaffectGfu,setIsOpenReaffectGfu]=useState(false)


  // modals / toasts
  const [isOpenModalSuppr, setIsOpenModalSuppr] = useState(false);
  const [showSuccessToast, setShowSuccesToast] = useState(false);
  const [idTodDelete,setIdToDelete]=useState(null);
  const [isDeleting,setIsDeleting]=useState(false)
  const [message,setMessage]=useState("Opération éffectuée avec succès");
  const [selectedMateriel,setSelectedMateriel]=useState(null);

  const navigate = useNavigate();

  // --- load agents ---
  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.getNumGfu();
        setNumsGfu(res.numsGfu || []);
      } catch (err) {
        console.error("Erreur chargement des numéros GFU : ", err);
        setNumsGfu([]);
      }
    };
    load();
  }, []);
        const [openDropdownId, setOpenDropdownId] = useState(null);


        const toggleDropdown = (id) => {
          setOpenDropdownId(openDropdownId === id ? null : id);
        };

  // --- filtrage : recalculer quand searchTerm OU utilisateurs changent ---
  useEffect(() => {
    const term = (searchTerm || "").trim().toLowerCase();

    if (!term) {
      setFilteredData(numsGfu);
      setCurrentPage(1);
      return;
    }

    const filtered = numsGfu.filter((item) =>
      Object.values(item).some((val) => (val ?? "").toString().toLowerCase().includes(term))
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, numsGfu]);

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
    setIsOpenFormNouveauGfu(false);
    setIsOpenModalSuppr(false);
    setIsOpenReaffectGfu(false)
  };
 const openFormNouveauGfu = () => setIsOpenFormNouveauGfu(true);
  const handleSuccess = async () => {
    handleClose();
    navigate("/app/gfu");
     try {
    const res = await API.getNumGfu();
    setNumsGfu(res.numsGfu || []);
  } catch (err) {
    console.error("Erreur rechargement de liste de GFU :", err);
  }
    setMessage("Numéro GFU créé avec succès !")
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
    await new Promise(resolve=>setTimeout(resolve,1200));
    handleCloseModalSuppr();
    await API.deleteNumGfu(idTodDelete);
    const res=await API.getNumGfu();
    setNumsGfu(res.numsGfu || []);
    setMessage("Numéro GFU supprimé avec succès !");
    setShowSuccesToast(true);
    setTimeout(() => setShowSuccesToast(false), 4000);
    setIsDeleting(false)

   }
   
   catch(err){
    console.log(err);
    
   }
    
  }
      const openModalReaffectGfu=(item)=>{
      setOpenDropdownId(false)
      setIsOpenReaffectGfu(true);
      setSelectedMateriel(item);
      console.log(selectedMateriel);
      
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
          onClick={() => openFormNouveauGfu()}
          className="px-2 py-2 absolute right-10 top-4 font-bold rounded-sm bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow hover:opacity-90"
        >
          + Ajouter
        </button>

        {/* Desktop-Version */}
        <div className="hidden md:block overflow-y-auto max-h-96">
          <table className="min-w-full divide-y divide-gray-200 overflow-hidden border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-gray-200 z-50">No</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-gray-200 z-50">Numéro</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-gray-200 z-50">Propriétaire</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-gray-200 z-50">Site</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-gray-200 z-50">Action</th>
              </tr>
            </thead>

            <tbody className=" divide-y divide-gray-200 bg-white ">
              {currentItems.map((item, idx) => (
                <tr key={item._id ?? idx}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{indexOfFirstItem + idx + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.numero}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.userActuel.prenom} {" "} {item.userActuel.nom} </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.userActuel.site.nom} </td>
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
                        <div className=" fixed mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1 z-50">
                            <Link to=""
                                onClick={() => openModalReaffectGfu(item)}
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
        <NouveauGfu isOpenFormNouveauGfu={isOpenFormNouveauGfu} closeFormNouveauGfu={handleClose} onSuccess={handleSuccess}/>
        {showSuccessToast && <ToastSuccess message={message} />}
        <ReaffectGFU isOpenModalInfo={isopenReaffectGfu} onCloseModalInfo={handleClose} gfu={selectedMateriel} onSuccess={(message)=>handleSuccess(message)}/>

        <ConfirmSuppression isOpen={isOpenModalSuppr} onClose={handleClose}  isDeleting={isDeleting} onConfirm={handleConfirmDelete} />
      </div>
    </>
  );
}
