import { useState } from 'react';
import { FiLogOut, FiKey, FiChevronDown } from 'react-icons/fi';
import logo_asecna from "/logo_asecna.png";
import { useAuth} from './authContext';
import API from '../services/API';
import ChangePasswordModal from "./ChangePasswordModal";
import ToastSuccess from "../components/ToastSuccess";

const NavBar = () => {

  const [isOpenModalChangePass,setIsOpenModalChangePass]=useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccessToast, setShowSuccesToast] = useState(false);


   const { user } = useAuth();
   const handleLogout=async()=>{
   await API.logout();
   window.location.href="/"
   }

    const handleChangePassword=()=>{
      setIsOpenModalChangePass(false);
      setShowSuccesToast(true);
      setTimeout(() => setShowSuccesToast(false), 4000);
    }


  return (
    <nav className={`relative top-0 z-50 w-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-20">
          {/* Logo à gauche */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <a className="ml-2 text-white text-xl font-bold">
                <img src={logo_asecna} alt="logo eamac"className='w-20 h-20' />
            </a>
            </div>
          </div>
          {/* Menu dropdown à droite */}
          <div className="ml-4 flex items-center md:ml-6 relative">
            <button
              type="button"
              className="max-w-xs bg-blue-700 rounded-xl flex items-center text-sm focus:outline-none border font-bold border-blue-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              id="user-menu"
              aria-expanded="false"
              aria-haspopup="true"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="sr-only">Ouvrir le menu utilisateur</span>
              <span className="text-white px-4 py-2">{user?.userName || "Invité"}</span>
              <FiChevronDown className="text-white mr-2" />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className=" absolute right-0 top-8 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a onClick={()=>{setIsOpenModalChangePass(true);setIsDropdownOpen(false)}}
                  href="#"
                  className=" px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 flex items-center"
                  role="menuitem"
                >
                  <FiKey className="mr-2 text-blue-600" />
                  Changer mot de passe
                </a>
                <a onClick={()=>handleLogout()}
                  href="#"
                  className=" px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 flex items-center"
                  role="menuitem"
                >
                  <FiLogOut className="mr-2 text-blue-600" />
                  Se déconnecter
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <ChangePasswordModal isOpen={isOpenModalChangePass} user={user} onClose={()=>{setIsOpenModalChangePass(false)}} onSave={handleChangePassword}/>
        {showSuccessToast && <ToastSuccess message={ "Mot de passe changé avec succès !"} />}
    </nav>
  );
};

export default NavBar;