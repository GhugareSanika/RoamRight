import React, { useEffect, useRef, useState } from 'react'
import { useValue } from '../../context/ContextProvider'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField ,Dialog} from '@mui/material'
import {Send,Close} from '@mui/icons-material'
import PasswordField from './PasswordField'
import GoogleOnetapLogin from './GoogleOnetapLogin'
const Login = () => {
    const {state:{openLogin},dispatch}=useValue()
    const [title,setTitle]=useState('Login')
    const [isRegister,setIsRegister] = useState(false)
    const nameRef=useRef()
    const emailRef=useRef()
    const passwordRef=useRef()
    const confirmPasswordRef=useRef()

    const handleClose = ()=>{
        dispatch({type:'CLOSE_LOGIN'})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()

        //Testing Loading
        dispatch({type:'START_LOADING'});
        setTimeout (()=>{
            dispatch({type:'END_LOADING'});
        },4000)
        // Testing Notification

        const password =passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if(password !==confirmPassword){
            dispatch({type:'UPDATE_ALERT',payload:{open:true,severity:'error',message:'Password Do not match'},})
        }
    }
    useEffect(()=>{
        isRegister ? setTitle('Register'): setTitle('Login');
    },[isRegister]);
  return (
    <Dialog
    open={openLogin}
    onClose={handleClose}
    >
        <DialogTitle>
            {title}
            <IconButton
            sx={{
                position:'absolute',
                top:8,
                right:8,
                color:(theme)=>theme.palette.grey[500]
            }}
            onClick={handleClose}
            >
                <Close/>
            </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                Please fill your information in the fields below:
                </DialogContentText>
                {isRegister && 
                <TextField
                autoFocus
                margin='normal'
                variant='standard'
                id='name'
                label='Name'
                type='text'
                fullWidth
                inputRef={nameRef}
                inputProps={{minLength:2}}
                required
                />
                }
                <TextField
                autoFocus={!isRegister}
                margin='normal'
                variant='standard'
                id='email'
                label='Email'
                type='email'
                fullWidth
                inputRef={emailRef}
                required
                />
                <PasswordField {...{passwordRef}}/>
                {isRegister && 
                <PasswordField passwordRef={confirmPasswordRef} id='confirmPassword' label='Confirm Password'/>
                }
            </DialogContent>
            <DialogActions>
                <Button type='submit' variant='contained' endIcon={<Send/>}>
                    Submit
                </Button>
            </DialogActions>
        </form>
        <DialogActions sx={{justifyContent:'left',p:'1px 24px'}}>
            {isRegister?'Do you have the account? Sign in now':"Don't have an account?Create one now"}
            <Button onClick={()=>setIsRegister(!isRegister)}>
            {isRegister ? 'Login':'Register'}
        </Button>
        </DialogActions>
        <DialogActions sx={{justifyContent:'center',py:'15px'}}>
            <GoogleOnetapLogin/>
        </DialogActions>
    </Dialog>
  )
} 

export default Login
