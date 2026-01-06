import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AssignShift from './pages/AssignShift'
import AddEmployee from './pages/AddEmployee'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/assignshift' element={<AssignShift/>}/>
      <Route path='/addemployee' element={<AddEmployee/>}/>
    </Routes>
  )
}
