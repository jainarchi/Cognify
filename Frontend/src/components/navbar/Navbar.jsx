import React, { useState } from "react";
import { Menu , X } from 'lucide-react';
import NavbarRight from "./NavbavRight";

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false)
  

  return (
    <nav className="w-full px-4 py-2 flex items-center justify-between md:px-20 lg:px-34
                    nav-bg shadow-xl h-[8vh] md:h-[10vh] sticky top-0 z-99">
      
      <h1 className="text-2xl font-bold text-white tracking-wide ">
        SkillSphere
      </h1>
     
       <div className="hidden md:block">
           <NavbarRight />
       </div>

      <div className="md:hidden text-white">
        {showMenu ? (
          <X size={28} onClick={() => setShowMenu(false)} />
        ) : (
          <Menu size={28} onClick={() => setShowMenu(true)} />
        )}
      </div>

      {showMenu && (
        <div className="absolute top-[8vh] right-0 w-full px-2 md:hidden
                        bg-gradient-to-r from-indigo-200 via-purple-200 to-blue-200
                        shadow-lg py-2">
          <NavbarRight />
        </div>
      )}


    </nav>
  );
};

export default Navbar;
