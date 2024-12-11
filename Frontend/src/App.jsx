import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home'
import UserLogin from './pages/UserLogin'
import Signup from './pages/Signup'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'

function App() {
  return (
    <div>
      <Routes>
        <Route  path='/' element= {<Home/>} />
        <Route  path='/login' element= {<UserLogin/>} />
        <Route  path='/signup' element= {<Signup/>} />
        <Route  path='/captain-login' element= {<Captainlogin/>} />
        <Route  path='/captain-signup' element= {<Captainsignup/>} />

      </Routes>
    </div>
  )
}

export default App