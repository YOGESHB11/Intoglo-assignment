import  Header from "./components/Header";
import Documents from "./components/Documents"
import AddDocs from "./components/AddDocs"
import Auth from "./components/Auth"
import UserDocs from "./components/UserDocs"
import React from 'react'
import {Route , Routes} from "react-router-dom"
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn)
  return (<React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path = "/auth" element ={<Auth/>}/>
        <Route path = "/docs" element ={<Documents/>}/>
        <Route path = "/docs/add" element ={<AddDocs/>}/>
        <Route path = "/myDocs" element ={<UserDocs/>}/>
      </Routes>
    </main>
  </React.Fragment>)
}

export default App;
