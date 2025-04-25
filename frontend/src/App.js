
import './App.css';
import CreatePage from './components/CreatePage';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {

  const[mode,SetMode] =useState("navy");

  const toggleMode=()=>{
    if(mode==="navy"){
      SetMode("orange");
      document.body.style.backgroundColor="orange";

    }
    else{
      SetMode("navy");
      document.body.style.backgroundColor="navy";
    }
  }


  return (
    <>
    
    <Navbar mode={mode} toggleMode={toggleMode}/>
    <CreatePage/>
    </>
  );
}

export default App;
