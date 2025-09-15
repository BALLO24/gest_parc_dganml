import { useState,useEffect } from "react";
import { data } from "../data/data";
import ItemsParPageOptions from "../components/ItemsParPage";
import NouveauTypeMateriel from "../components/NouveauTypeMateriel";
import SearchBar from "../components/SearchBar";
import { AiFillDelete } from "react-icons/ai";
import ConfirmSuppression from "../components/CofirmSuppression";
// import DetailModalTypeMateriel from "../components/DetailModalTypeMateriel";
// import DropdownAjoutTypeMateriel from "../components/DropDownAjoutTypeMateriel";

export default function TypesMaterielsPage(){
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
            

        //Etat de la pagination
        const [currentPage, setCurrentPage]=useState(1);
        const [itemsPerPage,setItemPerPage]=useState(5);
        const [searchTerm,setSearchTerm]=useState("");
        const [filteredData,setFilteredData]=useState(typesMateriels)
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
            const filtered=typesMateriels.filter(item => 
                Object.values(item).some(
                    val=>val.toString().toLowerCase().includes(searchTerm.toLowerCase())))
                    console.log(filtered);
                    
                setFilteredData(filtered);
                setCurrentPage(1);
            },[searchTerm])
            const [isOpenFormNouveauTypeMateriel,setIsOpenFormNouveauTypeMateriel]=useState(false);
            const [isOpenModalSuppr,setIsOpenModalSuppr]=useState(false)
            
            
            const handleClose=()=>{
                setIsOpenFormNouveauTypeMateriel(false)
            }


            const openFormNouveauTypeMateriel=()=>{
                setIsOpenFormNouveauTypeMateriel(true)
            }

            const openModalSuppr=()=>{
                setIsOpenModalSuppr(true)
            }

            const handleCloseModalSuppr=()=>{
                setIsOpenModalSuppr(false)           
            }
    return(
        <>
           <div className="relative ml-52 p-4 max-w-full overflow-hidden ">
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
                <button onClick={()=>openFormNouveauTypeMateriel()} className="px-2 py-2 absolute right-10 top-4 font-bold rounded-sm bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow hover:opacity-90">+ Ajouter</button>
                {/* Desktop-Version */}
                <div className="hidden md:block">
                    <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">No</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Nom</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        
                        <tbody className=" divide-y divide-gray-200 bg-white ">
                            {currentItems.map((item)=>(
                                <tr key={item.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.id}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.nom}</td>
                                    <td className="px-6 py-2 whitespace-nowrap text-gray-600">
                                        <button 
                                            onClick={() =>openModalSuppr()}
                                            className="flex items-center px-2 py-2 text-sm font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-800 shadow-lg text-white rounded-md hover:bg-gray-100  text-center">
                                            <AiFillDelete className="mr-1 text-xl "/>Supprimer
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
                <NouveauTypeMateriel isOpenFormNouveauTypeMateriel={isOpenFormNouveauTypeMateriel} closeFormNouveauTypeMateriel={handleClose}/>
                <ConfirmSuppression isOpen={isOpenModalSuppr} onClose={handleCloseModalSuppr} onConfirm={handleCloseModalSuppr}/>
           </div>
        </>
    )
}