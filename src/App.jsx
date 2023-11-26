import React, { useReducer, useRef, useEffect, useContext } from "react";

import './App.css'
import Form from "./components/Form";
import ThemeContext, { ThemeProvider } from "./components/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import Content from "./components/Content";
function App() {
 
  
 
  return (
    <>
    <ThemeProvider>
    <div className="App">
    <Content />
    </div>
   <ThemeToggle />
        
    </ThemeProvider>
   
    
    </>
  )
}

export default App
