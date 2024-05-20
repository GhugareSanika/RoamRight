import { Avatar, Badge, IconButton, Tooltip,Box } from '@mui/material'
import Mail from '@mui/icons-material/Mail';
import Notification from '@mui/icons-material/Notifications';
import React, { useState } from 'react'
import { useValue } from '../../context/ContextProvider'
import UserMenu from '../UserMenu';

const UserIcons = () => {
    const {
        state:{currentUser}
    }= useValue()

    const [anchorUserMenu,setAnchorUserMenu]=useState(null)
  return (
    <Box>
        <IconButton size='large' color='inherit'>
            <Badge color='error' badgeContent={5}>
                <Mail/>
            </Badge>
        </IconButton>
        <IconButton size='large' color='inherit'>
            <Badge color='error' badgeContent={20}>
                <Notification/>
            </Badge>
        </IconButton>
        <Tooltip title='Open User Setting'>
            <IconButton onClick={(e)=>setAnchorUserMenu(e.currentTarget)}>
                <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
                    {currentUser?.name?.charAt(0).toUppercase}
                </Avatar>
            </IconButton>
        </Tooltip>
        <UserMenu {...{anchorUserMenu,setAnchorUserMenu}}/>
    </Box>
  )
}

export default UserIcons
