import { createPortal } from "react-dom";
import { useState } from "react";
import API from "../services/API";
import ToastSuccess from "./ToastSuccess"
import { ImSpinner } from "react-icons/im";

const ChangePasswordModal = ({ isOpen, onClose, onSave, user }) => {
  const [password, setPassword] = useState("");
  const [isSubmitting,setIsSubmitting]=useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    // onSave(user.id, password);
    // setPassword("");
    try{
    setIsSubmitting(true);
    await API.changePassword(user.userId,password);
    onSave();
    setIsSubmitting(false);
    setPassword("");
    }
    catch(err){
      console.error(err);
      setIsSubmitting(false)
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Changer le mot de passe</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 font-bold text-xl">✕</button>
        </div>

        {/* Body */}
        <div className="space-y-4">
          <p className="text-gray-700 text-sm">Utilisateur: <span className="font-semibold">{user.userName} {user.prenom}</span></p>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className={`${isSubmitting ? "cursor-not-allowed" : "" } px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition`}
          >
            {isSubmitting ? <ImSpinner className="animate-bounce"/> :"Changer"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ChangePasswordModal;
