import React, { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { login } from "../../store/authSlice"
import {Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import axios from 'axios'

const Login = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)

    useEffect(()=> {
        if (isAuthenticated){
            navigate('/');
        }
    }, [isAuthenticated, navigate])

    const [formData, setFormData] = useState({
        eamil: "",
        password: ""
    })

    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData((prevData)=>({
            ...prevData, [name]:value
        }))
    }

    const handleSignIn = async ()=>{
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', formData)

            if (response.status === 200){
                dispatch(login(response.data.user))
                navigate("/");
            } 
        } catch (error) {
            console.log("login error: ", error)
        }
    }
    
    return (
        <div className="flex h-screen w-full justify-center items-center">
            <Card className="w-96">
                <CardHeader variant="gradient" color="gray" className="mb-4 grid h-28 place-items-center">
                    <Typography variant="h3" color="white">
                      Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Email" size="lg" name="email" value={FormData.email} onChange={handleChange} />
                    <Input label="Password" size="lg" name="password" value={FormData.password} onChange={handleChange} />
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={()=> handleSignIn()} fullWidth>
                      Sign In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                      Don&apos;t have an account?
                      <Typography as="a" href="/register" variant="small" color="blue-gray" className="ml-1 font-bold">
                        Sign up
                      </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login