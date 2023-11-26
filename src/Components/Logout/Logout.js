import React, { useEffect, useState } from 'react';
import './Logout.css';
import Cookies from 'js-cookie';


const Logout = () => {

    useEffect(() => {
        const access_token = Cookies.get('jwt_authorization');

        if(access_token) {
          Cookies.remove('jwt_authorization');
        } 
    }, [])

    return(
        <>
            <div className="text">Please login to access your information!</div>
        </>
    )
   
}

export default Logout