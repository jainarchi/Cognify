import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from 'lucide-react';
import axios from "axios";
import { AUTH_PATHS } from "../../utils/Path";

import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext'



const Login = () => {
 const { login } = useContext(AuthContext);


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!email || !password) {
      setError("Please fill all fields!");
      return;
    }


  try {
    const res = await axios.post(AUTH_PATHS.LOGIN, {
      email,
      password,
    });
 
     const authData = {
      token: res.data.user.token,
      user: {
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
      },
    };


    login(authData); 
    navigate("/");

  } catch (err) {
    setError(
      err.response?.data?.message || "Login failed. Try again."
    );
  }
   
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className=" text-red-500 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="btn py-2.5"
          >
            <LogIn className='icon' />
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
