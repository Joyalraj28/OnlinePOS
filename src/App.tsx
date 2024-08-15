import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from './Component/Mainpage/Mainpage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Receipt from './Component/Receipt/Receipt'


const App :React.FC<{}> = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<MainPage/>}/>
        <Route  path='/print' element={<Receipt/>} />
      </Routes>
    </BrowserRouter>
  )
};

export default App
