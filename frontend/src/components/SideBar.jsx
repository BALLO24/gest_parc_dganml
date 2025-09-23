import { useState, useEffect, } from 'react';
import { 
  FiMenu, 
  FiX, 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaTools } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { LuBookType } from "react-icons/lu";
import { GrUserSettings } from "react-icons/gr";
import { FaSimCard } from 'react-icons/fa6';


const SideBar = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
          const mobile = window.innerWidth < 768;
          setIsMobile(mobile);
          if(mobile){
            setIsOpenSidebar(false)
          }
          
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [window.innerWidth]);
    return (
      <div className={`flex h-full bg-gray-100 font-bold `}>

  
        {/* Sidebar */}
        <div 
          className={`relative z-30 max-w-md bg-blue-800 text-white transition-all duration-300 ease-in-out pr-4 ${isOpenSidebar ? "":""}`}
        >
          <div className="p-2 flex items-center justify-between border-b border-blue-700">
            {/* <h1 className="text-xl font-bold">EAMAC </h1> */}
            
              <button className="text-white" onClick={()=>setIsOpenSidebar(!isOpenSidebar)}>
                {isOpenSidebar===true ? <FiX size={24} /> : <FiMenu size={24} />}
                
              </button>
            
          </div>
  
          <nav className={`overflow-y-auto h-[calc(100vh-65px)] ${isMobile && !isOpenSidebar ? "hidden":""}`}>
            <ul className="space-y-1">
              <li>
                <Link to="/app/materiels" className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaTools className="mr-1" size={22}/>
                  <span className={`${isOpenSidebar===true ? "" : "hidden"}`}>Matériels</span>
                </Link>
              </li>
            <li>
                <Link to="/app/gfu" className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors">
               <FaSimCard className="mr-1" size={22}/>
                  <span className={`${isOpenSidebar===true ? "" : "hidden"}`}>GFU</span>
                </Link>
              </li>
              
            <li>
                <Link to="/app/agents" className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors">
               <FaUsers className="mr-1" size={22}/>
                  <span className={`${isOpenSidebar===true ? "" : "hidden"}`}>Agents</span>
                </Link>
              </li>
              <li>
                <Link to="/app/sites" className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <PiBuildingApartmentFill  className="mr-1" size={22}/>
                  <span className={`${isOpenSidebar===true ? "" : "hidden"}`}>Sites</span>
                </Link>
              </li>
              <li>
                <Link to="/app/types-materiels" className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <LuBookType className="mr-1" size={22}/>
                  <span className={`${isOpenSidebar===true ? "" : "hidden"}`}>Types</span>
                </Link>
              </li>
                <li>
                <Link to="/app/utilisateurs" className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <GrUserSettings className="mr-1" size={22}/>
                  <span className={`${isOpenSidebar===true ? "" : "hidden"}`}>Utilisateurs</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>        
      </div>
    );
};

export default SideBar;