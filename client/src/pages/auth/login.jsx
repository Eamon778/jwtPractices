import React, { useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { login } from "../../store/authSlice"

const Login = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)

    useEffect(()=> {
        if (isAuthenticated){
            navigate('/');
        }
    }, [isAuthenticated, navigate])
    
    return (
        <div>
            <h1>Login page</h1>
        </div>
    )
}

export default Login