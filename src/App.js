import './App.css';
import React, { useState } from "react";
import { BrowserRouter,Link, Routes , Route} from 'react-router-dom';
import Post from './components/post';
import Home from './components/home';
import Detail from './components/post_detail';
import { AuthProvider } from "./context/AuthContext";
import SearchPage from './components/searchpage';
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/post" element={<Post/>}/>
          <Route path="/detail" element={<Detail/>}/>
          <Route path="/search/:text" element={<SearchPage/>}/>

        </Routes>
      

      
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
