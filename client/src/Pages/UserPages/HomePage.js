import React, { useEffect } from 'react'
import Header from '../../Components/UserComponets/Home/Header'
import Home from '../../Components/UserComponets/Home/Home'
import axios from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { verifyUserToken } from '../../utils/Constants'

import { useSelector, useDispatch } from 'react-redux';
import {  Navigate } from 'react-router-dom';
import { sessionHandle } from '../../Redux/authSlic';


function HomePage() {
  const isLogged = useSelector((state) => state.authSlice);
  const jwtToken = localStorage.getItem('token'); 
  console.log(jwtToken)

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (jwtToken) {
      
     
  //   }
  // }, [jwtToken, dispatch]);

  // if (!isLogged) {
  //   return <Navigate to="/" replace/>;
  // }

  const navigate = useNavigate()
  useEffect(() => {
    const Token = localStorage.getItem('token');
    if (!Token) {
      navigate('/')
    } else {
      const body = JSON.stringify({ Token });
      axios.post(verifyUserToken, body, { headers: { "Content-Type": "application/json" } }).then((response) => {
        if (response.data.token) {
          dispatch(sessionHandle(Token));
          navigate('/home')
        }
          
        
      })
    }
  }, [navigate,dispatch])




  const Token = localStorage.getItem('token');
  if (!Token) {
    navigate('/')
  } else {
    const body = JSON.stringify({ Token });
    axios.post(verifyUserToken, body, { headers: { "Content-Type": "application/json" } }).then((response) => {
      if (response.data.token) {
        dispatch(sessionHandle(Token));
        navigate('/home')
      }
        
      
    })
  }






  
  return (
    <div>
      <Header />
      <Home />
    </div>
  )
}

export default HomePage