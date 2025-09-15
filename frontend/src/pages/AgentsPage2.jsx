import { useState,useEffect } from "react";
import { data } from "../data/data";
import ItemsParPageOptions from "../components/ItemsParPage";
import SearchBar from "../components/SearchBar";
import { TbListDetails } from "react-icons/tb";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { Link } from "react-router-dom";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { AiFillDelete } from "react-icons/ai";
import DetailModalAgent from "../components/DetailModalAgent";
// import DropdownAjoutAgent from "../components/DropDownAjoutAgent";

export default function AgentsPage(){
            const agents=data.agents;

        const [openDropdownId, setOpenDropdownId] = useState(null);


        const toggleDropdown = (id) => {
          setOpenDropdownId(openDropdownId === id ? null : id);
        };


        //Etat de la pagination
        const [currentPage, setCurrentPage]=useState(1);
        const [itemsPerPage,setItemPerPage]=useState(5);
        const [searchTerm,setSearchTerm]=useState("");
        const [filteredData,setFilteredData]=useState(agents)
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
            const filtered=agents.filter(item => 
                Object.values(item).some(
                    val=>val.toString().toLowerCase().includes(searchTerm.toLowerCase())))
                    console.log(filtered);
                    
                setFilteredData(filtered);
                setCurrentPage(1);
            },[searchTerm])

            const [isOpenDetailAgent,setIsOpenDetailAgent]=useState(false)
            const handleClose=()=>{
                setIsOpenDetailAgent(false)
            }
            
            const openDetailAgent=()=>{
                setIsOpenDetailAgent(true);
                setOpenDropdownId(false)
                
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
                <button onClick={()=>openDetailAgent()} className="px-2 py-2 absolute right-10 top-4 font-bold rounded-sm bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white shadow hover:opacity-90">+ Ajouter</button>
                {/* Desktop-Version */}
                <div className="hidden md:block">
                    <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">No</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Nom</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Service</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Site</th>
                                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        
                        <tbody className=" divide-y divide-gray-200 bg-white ">
                            {currentItems.map((item)=>(
                                <tr key={item.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.id}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.nom}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.service}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.site}</td>
                                    <td className="px-6 py-2 whitespace-nowrap text-gray-600">
                                        <div className="relative inline-block text-left">
                                            <div>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    onClick={() => toggleDropdown(item.id)}
                                                >
                                                    Actions
                                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {openDropdownId === item.id && (
                                            <div className=" fixed mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                                                <div className="py-1 z-50">
                                                <button
                                                    onClick={()=>openDetailAgent(item.id)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <TbListDetails className="mr-1 text-xl" />Détails
                                                </button>
                                                <Link to=""
                                                    //onClick={() => handleAction(item.id, 'Modifier')}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                <MdOutlinePublishedWithChanges className="mr-1 text-xl"/>Modifier
                                                </Link>
                                                <Link to=""
                                                    // onClick={() => handleAction(item.id, 'Modifier')}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                <LiaExchangeAltSolid  className="mr-1 text-xl"/>Reaffectation
                                                </Link>
                                                <Link to=""
                                                    // onClick={() => handleAction(item.id, 'Modifier')}
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
                <DetailModalAgent isOpenModalInfo={isOpenDetailAgent} onCloseModalInfo={handleClose}/>
           </div>
        </>
    )
}