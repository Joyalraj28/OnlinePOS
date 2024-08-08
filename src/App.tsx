import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from './Component/Mainpage/Mainpage'


const App :React.FC<{}> = () => {

  return (
    <div>
      <MainPage/>
    </div>
  )
};

export default App
