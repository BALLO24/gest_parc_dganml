import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar en haut */}
      <NavBar />

      {/* Contenu principal : Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SideBar />

        {/* Main */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
