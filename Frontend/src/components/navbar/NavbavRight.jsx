import React from "react";
import { LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



const NavbarRight = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };



  return (
    <div className="flex flex-col items-center gap-4 md:flex-row relative z-99">
       <button
            className="btn btn-mobile "
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            className="btn btn-mobile "
            onClick={() => navigate('/notes')}
          >
            Notes
          </button>
          

      {!isLoggedIn ? (
        <>
          <button
            className="btn btn-mobile"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
          <button
            className="btn btn-mobile"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <div>
            <button
              className="btn btn-mobile md:hidden"
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>

            <button
              className="hidden md:block w-10 h-10 rounded-full bg-white/30
              flex items-center justify-center
              text-white font-bold hover:bg-white/40 transition"
              onClick={() => navigate('/profile')}
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </button>
          </div>

          <button
            className="btn btn-mobile flex gap-1"
            onClick={handleLogout}
          >
            Logout <LogOut className="h-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default NavbarRight;
