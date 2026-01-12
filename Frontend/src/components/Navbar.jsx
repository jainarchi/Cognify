import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full px-2 py-2 flex items-center justify-between md:px-20
                    bg-gradient-to-r from-indigo-400 via-purple-300 to-blue-300
                    shadow-xl">
      
      
      <h1 className="text-2xl font-bold text-white tracking-wide">
        Conify
      </h1>
     
      <div className="flex items-center gap-3">
        <button className="btn">
          Login
        </button>

        <button className="btn">
          Sign Up
        </button>

        <button className="w-10 h-10 rounded-full bg-white/30 
                           flex items-center justify-center
                           text-white font-bold hover:bg-white/30
                           transition">
          P
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
