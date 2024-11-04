import React from "react";
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import Home from "./pages/home";
import Login from './pages/auth/login'

const App = ()=>{
  return (
    <div>
      <h1>Header component</h1>

      <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected route */}
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />

    </Routes>
    </div>
  )
}

export default App