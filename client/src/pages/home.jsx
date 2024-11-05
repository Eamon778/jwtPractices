import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const Home = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state)=> state.auth.user)
    const handleLogout = ()=>{
        dispatch(logout())
    }

    return (
        <div>
            <h1>Hello world</h1>
            <button onClick={()=>handleLogout()}>Log out</button>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    )
}

export default Home;