import React from "react";
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import Home from "./pages/home";
import Login from './pages/auth/login'
import Register from "./pages/auth/register";

const App = ()=>{
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>

      {/* Protected route */}
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />

    </Routes>
  )
}

export default App