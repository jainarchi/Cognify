import React from 'react'
import Navbar from '../components/navbar/Navbar'
import QuizCatagory from '../components/quiz/QuizCatagory'
import MainPageView from '../components/MainPageView'

const Home = () => {
  return (
    <div>
        <Navbar />
        <MainPageView />
        <QuizCatagory />

      
    </div>
  )
}

export default Home
