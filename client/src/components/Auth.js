import React ,{useState} from 'react'
import {Box, TextField ,Typography, Button} from "@mui/material"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from './../store/index';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        name:"",email:"",password:"",phone:"",photo:""
    })
    const [isSignup , setIsSignup] = useState(false)
    const handleChange =(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }
    const sendRequest = async (type='login')=> {
        const res = await axios.post(`http://localhost:5000/${type}` ,{
            name : inputs.name,
            phone : inputs.phone,
            photo : inputs.photo,
            email : inputs.email,
            password : inputs.password
        }).catch((err)=>console.log(err))
        const data = await res.data
        return data
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
        if(isSignup){
            sendRequest("signup").then(()=>dispatch(authActions.login())).then(()=>navigate("/docs")).then(data => console.log(data))
        }else{
            sendRequest().then(()=>dispatch(authActions.login())).then(()=>navigate("/docs")).then(data => console.log(data))
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Box 
                maxWidth = {400}
                display = 'flex' 
                flexDirection={'column'} 
                alignItems='center' 
                justifyContent={'center'} 
                boxShadow ='10px 10px 20px #ccc' 
                padding = {3} margin = 'auto'
                marginTop ={5}
                borderradius ={5}
            >
                <Typography padding ={3} variant ="h3">
                    {isSignup ? 'Signup' : 'Login'}
                </Typography>
                {isSignup && <><TextField name='name' onChange={handleChange} value={inputs.name} placeholder = 'Name' margin='normal'/>
                <TextField name='phone' onChange={handleChange} value={inputs.phone} type={'number'} placeholder ='Phone'margin='normal'/>
                <TextField name='photo' onChange={handleChange} value={inputs.photo} type={'file'} placeholder='Photo' margin='normal'/></>}{" "}
                <TextField name='email' onChange={handleChange} value={inputs.email} type ={'email'} placeholder = 'Email' margin ="normal"/>
                <TextField name='password' onChange={handleChange} value={inputs.password}  placeholder = 'Password' margin ="normal"/>
                
                <Button type = 'submit' variant = 'contained'>Submit</Button>
                <Button onClick={()=>setIsSignup(!isSignup)}>
                    Change To {isSignup ? 'Login' : "Signup"}
                </Button>
            </Box>
        </form>
    </div>
  )
}

export default Auth