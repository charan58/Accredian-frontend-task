import React, { useState } from 'react';
import { loginContext } from './loginContext';
import axios from 'axios';

function UserLoginContextStore({ children }) {
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  // get token
  let token=localStorage.getItem('token');
  const login = (userLogData) => {
    axios.post('http://localhost:4000/user-api/login', userLogData,{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.message === "success") {
          // upadte current user status
          setCurrentUser({ ...response.data.user });
          // update login status
          setUserLoginStatus(true);
          // errors are null
          setError("");
          localStorage.setItem("token", response.data.token);
        } else {  
          setError(response.data.message);
        }
      }).catch((err)=>{
        if(err.response && err.response.status===401)
        {
          setError("Invalid Credentials");
        }
        else{
          setError("An unexpected error has occured")
        }
      })
  };

  // user logout
  const logout = () => {
    // clear browser storage
    localStorage.clear();
    // update userlogin status
    setUserLoginStatus(false);
  };

  return (
    <loginContext.Provider value={[currentUser, error, userLoginStatus, login, logout]}>
      {children}
    </loginContext.Provider>
  );
}

export default UserLoginContextStore;
