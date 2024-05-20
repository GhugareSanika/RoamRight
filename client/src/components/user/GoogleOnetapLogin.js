// import { Button } from '@mui/material'
// import { Google } from '@mui/icons-material'
// import React, { useState } from 'react'
// import { useValue } from '../../context/ContextProvider'

// const GoogleOnetapLogin = () => {

//   const{dispatch} = useValue()
//   const [disabled,setDisabled]=useState(false)


//   const handleResponse = (response)=>{
//     console.log(response)   
//   }
//   const handleGoogleLogin=()=>{
//     setDisabled(true)
//     try{
//       window.google.accounts.id.initialize({
//         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//         callback:handleResponse
//       })

//       window.google.accounts.id.prompt((notification)=>{
//         if(notification.isNotDisplayed()){
//           throw new Error('Try to clear the cookies or try again later')
//         }
//         if(notification.isSkippesMoment()||notification.isDismissedMoment){
//           setDisabled(false)
//         }
//       })

//     }catch(error){
//         dispatch
//         ({type:'UPDATE_ALERT',
//         payload: {open:true,severity:'error',message:error.message},
//       })
//       console.log(error);
//     }
//   }
//   return (
//     <Button 
//     variant='outlined'
//     startIcon={<Google/>} disabled={disabled} onClick={handleGoogleLogin}
//     >
//         Login with Google
//     </Button>
//   )
// }

// export default GoogleOnetapLogin


import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useValue } from '../../context/ContextProvider';

const GoogleOnetapLogin = () => {
  const { dispatch } = useValue();
  const [disabled, setDisabled] = useState(false);

  const handleResponse = (response) => {
    console.log(response);
  };

  const handleGoogleLogin = () => {
    setDisabled(true);
    try {
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      if (!clientId) {
        throw new Error('Google Client ID not found');
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleResponse,
      });

      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error('Try to clear the cookies or try again later');
        }
        if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
          setDisabled(false);
        }
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { open: true, severity: 'error', message: error.message },
      });
      console.log(error);
      setDisabled(false); // Ensure the button gets re-enabled in case of an error
    }
  };

  useEffect(() => {
    // const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    // if (!clientId) {
    //   console.error('Google Client ID not found');
    //   return;
    // }
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    console.log('Google Client ID:', clientId);
    if (!clientId) {
      throw new Error('Google Client ID not found');
    }

    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleResponse,
      });
    }
  }, []);

  return (
    <Button
      variant="outlined"
      startIcon={<Google />}
      disabled={disabled}
      onClick={handleGoogleLogin}
    >
      Login with Google
    </Button>
  );
};

export default GoogleOnetapLogin;
