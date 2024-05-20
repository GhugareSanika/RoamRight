import React from 'react'
import {AppBar, Box, Container, IconButton, Toolbar, Typography,Button} from "@mui/material"
import {Menu,Lock} from "@mui/icons-material"
import { useValue } from '../context/ContextProvider'
import UserIcons from './user/UserIcons'



const NavBar = () => {

    const {
        state:{currentUser},
        dispatch
    }= useValue()
  return (
    <AppBar>
            <Container maxWidth='lg'>
                <Toolbar disableGutters>
                <Box sx={{me:1}}>
                    <IconButton size='large' color='inherit'>
                        <Menu/>
                    </IconButton>
                </Box>
                <Typography
                variant='h6'
                component='h1'
                noWrap
                sx={{flexGrow:1,display:{xs:'none',md:'flex'}}}
                >
                    RoamRight
                </Typography>
                <Typography
                variant='h6'
                component='h1'
                noWrap
                sx={{flexGrow:1,display:{xs:'flex',md:'none'}}}
                >
                    RR
                </Typography>
                {!currentUser ? (<Button color="inherit" startIcon={<Lock/>} onClick={()=>dispatch({type:'OPEN_LOGIN'})}>
                    Login
                </Button>) : (
                    <UserIcons/>
                )}
                
                </Toolbar>

            </Container>
    </AppBar>
  )
}

export default NavBar
