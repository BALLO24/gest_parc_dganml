import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle, FaPaperPlane } from "react-icons/fa";
import logo_asecna from "/logo_asecna.png";

export default function PageIntrouvable() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
      {/* Logo en haut à droite */}
      <div className="absolute top-7 left-4">
        <img src={logo_asecna} alt="logo eamac" className="w-20 h-20 animate-bounce" />
      </div>

      <main
        className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200 p-8"
        role="main"
        aria-labelledby="notfound-heading"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Texte */}
          <section>
            <h1
              id="notfound-heading"
              className="text-6xl md:text-7xl font-extrabold text-gray-800 tracking-wide"
            >
              404
            </h1>

            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-gray-700">
              Oups — page introuvable
            </h2>

            <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
              Il semble que cette adresse n’existe pas. Peut-être que la page a été déplacée, renommée, ou que tu t'es trompé·e de chemin.
              Vérifie l'URL ou retourne à l'accueil pour continuer.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-xl shadow-sm transition"
                aria-label="Retour à l'accueil"
              >
                <FaHome className="w-4 h-4" />
                Retour à l'accueil
              </Link>

              <a
                href="mailto:admin@ton-domaine.tld?subject=Signalement%20%C3%A0%20404"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl border border-gray-200 transition"
              >
                <FaPaperPlane className="w-4 h-4" />
                Signaler
              </a>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 text-gray-700 bg-transparent border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                <FaExclamationTriangle className="w-4 h-4" />
                Revenir
              </button>
            </div>

            <div className="mt-6 text-xs md:text-sm text-gray-500">
              Astuce : tu peux aussi utiliser la barre d'adresse pour corriger l'URL ou contacter l'administrateur si le problème persiste.
            </div>
          </section>

          {/* Illustration */}
          <aside className="flex justify-center">
            <div className="w-full max-w-md" aria-hidden>
              <svg viewBox="0 0 600 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0" stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="1">
                    <stop offset="0" stopColor="#2563eb" />
                    <stop offset="1" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width="600" height="420" rx="24" fill="url(#g1)" opacity="0.08" />

                <g transform="translate(40,40)">
                  <path d="M60 260 C 110 200, 190 200, 240 240 C 290 280, 370 280, 420 220" stroke="url(#g2)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95"/>

                  <circle cx="60" cy="260" r="18" fill="#0ea5e9" opacity="0.95" />
                  <circle cx="420" cy="220" r="26" fill="#7c3aed" opacity="0.95" />

                  <g transform="translate(160,70) scale(0.9)">
                    <rect x="0" y="40" rx="16" width="200" height="120" fill="#f3f4f6" opacity="0.9" />
                    <rect x="12" y="54" rx="8" width="176" height="92" fill="#e5e7eb" opacity="0.7" />
                    <circle cx="40" cy="80" r="10" fill="#60a5fa" />
                    <rect x="70" y="68" width="90" height="8" rx="4" fill="#9ca3af" />
                    <rect x="70" y="86" width="90" height="8" rx="4" fill="#9ca3af" />
                    <rect x="70" y="104" width="90" height="8" rx="4" fill="#9ca3af" />
                  </g>

                  <g transform="translate(320,18) rotate(12)">
                    <ellipse cx="30" cy="30" rx="34" ry="24" fill="#60a5fa" opacity="0.12" />
                    <circle cx="30" cy="30" r="10" fill="#3b82f6" />
                    <text x="18" y="36" fontFamily="Inter, ui-sans-serif, system-ui" fontSize="22" fill="#374151" fontWeight="700">404</text>
                  </g>
                </g>

              </svg>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}