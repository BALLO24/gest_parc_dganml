import { Link } from "react-router-dom";
import logo_asecna from '/logo_asecna.png';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { ImSpinner } from "react-icons/im";
import API from "../services/API";
import { useNavigate } from "react-router-dom";
import ToastError from "../components/ToastError";
import { useAuth } from "../components/authContext";

export default function LoginForm() {   
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [showErrorToast,setShowErrorToast]=useState(false)
    const navigate=useNavigate();
    const { refreshUser } = useAuth();

    const initialValues = {
        email: "",
        mot_de_passe: "",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("L'adresse email est obligatoire")
            .email("Veuillez choisir une adresse email valide"),
        mot_de_passe: Yup.string()
            .required("Le mot de passe est obligatoire")
            .min(3,"Mot de passe très court"),
    });

const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const isLogged = await API.login(values);

      if (isLogged) {
        await refreshUser(); // on recharge l’utilisateur après login
        navigate("/app/");
      } else {
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 2000);
      }
    } catch (err) {
      console.error("Erreur login:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
    return(       
        <section className="min-h-screen flex items-center justify-center bg-zinc-300">
            <div className="w-full max-w-md bg-gray-50 rounded-2xl shadow-lg sm:mx-4 mx-2">
                {/* Logo */}
                <div className="flex justify-center pt-6">
                    <img src={logo_asecna} alt="logo EAMAC" className="h-20 w-auto" />
                </div>

                {/* Contenu */}
                <div className="p-6 sm:p-8 space-y-6">
                    <h1 className="text-xl font-bold text-center text-blue-700">
                        Gestion de parc informatique DGANML
                    </h1>

                    <Formik 
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <Form className="space-y-5" onSubmit={formik.handleSubmit}>
                                {/* Champ email */}
                                <div>
                                    <Field 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        placeholder="Veuillez saisir votre Email"
                                        className="block w-full p-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <ErrorMessage 
                                        name="email" 
                                        className="text-red-500 text-sm mt-1 block text-left" 
                                        component="span" 
                                    />
                                </div>

                                {/* Champ mot de passe */}
                                <div>
                                    <Field 
                                        type="password" 
                                        name="mot_de_passe" 
                                        id="mot_de_passe" 
                                        placeholder="Veuillez saisir votre mot de passe"
                                        className="block w-full p-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <ErrorMessage 
                                        name="mot_de_passe" 
                                        className="text-red-500 text-sm mt-1 block text-left" 
                                        component="span" 
                                    />
                                </div>

                                {/* Bouton */}
                                <div className="flex justify-center">
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`${isSubmitting ? "cursor-not-allowed opacity-80" : ""} w-full text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-3 shadow-md transition`}
                                    >
                                        {isSubmitting ? <ImSpinner className="animate-spin inline-block w-5 h-5 mr-2"/> : "Se connecter"}
                                    </button>
                                </div>

                                {/* Liens */}
                                <div className="text-sm font-medium text-left space-y-1">
                                    <Link to="/reset_password" className="text-blue-700 hover:underline">
                                        Mot de passe oublié ?
                                    </Link><br/>
                                    <Link to="/need_help" className="text-blue-700 hover:underline">
                                        Besoin d’aide ?
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            {showErrorToast && <ToastError message="email ou mot de passe incorrect !" />}
            </div>
        </section>
    )
}
