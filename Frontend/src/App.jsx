import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Route , Routes} from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";

import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/Profile'
import QuizPage from './pages/Quiz/ShowQuiz';
import AnalyzeWrongAns from './pages/Quiz/AnalyzeWrongAns';
import Notes from './pages/Notes'



const App = () => {
  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/analyze/wrong-ans' element={<AnalyzeWrongAns />}/>
        <Route path='/notes' element={<Notes />}/>

        <Route path="/quiz/:tech/:level" element={<QuizPage />} />
        
        
      </Routes>
    </AuthProvider>

      <ToastContainer position="top-right" autoClose={2000} limit={1} />
    </>
  )
}

export default App
