import React from 'react'
import { useContext } from 'react';
import { loginContext } from '../../contexts/loginContext';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
function UserProfile() {
    const [currentUser,error,userLoginStatus,login,logout]=useContext(loginContext);
    console.log(currentUser);
  return (
    <Box sx={{textAlign:"center",}}>
        <Typography variant='h2'>Hey, Welcome <span><Typography sx={{marginTop:"1rem"}} variant='h5'>{currentUser.name}</Typography></span></Typography>
    </Box>
  )
}

export default UserProfile