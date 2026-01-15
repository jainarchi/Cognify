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

  const handleNotes = () =>{
     navigate( isLoggedIn ? '/notes' : '/login')
  }



  return (
    <div className="flex flex-col items-center gap-4 md:flex-row relative z-99">
      <button
        className="nav-btn  "
        onClick={() => navigate('/')}
      >
        Home
      </button>

      <button
        className="nav-btn  "
        onClick={handleNotes}
      >
        Notes
      </button>


      {!isLoggedIn ? (
        <>
          <button
            className="nav-btn"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
          <button
            className="nav-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </>
      ) : (
        <>

          <button
            className="nav-btn"
            onClick={() => navigate('/profile')}
          >
            Profile
          </button>

          <button
            className="nav-btn  flex items-center "
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
