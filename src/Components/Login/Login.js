import React, { useEffect, useState } from 'react';
import './Login.css';
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";
import {getApiConfig} from "../../helpers";
import {toast} from "react-toastify";
import {jwtDecode} from "jwt-decode";


const Login = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
       
    }, []);

    const login = (jwt_token) => {
        const decoded = jwtDecode(jwt_token);

        setUser(decoded);    
        Cookies.set("jwt_authorization", jwt_token);

        window.location.href = '/homepage';
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }

        const endpoint = `${getApiConfig().apiBaseUrl}/auth/login`;

        try {
            const response = await axios.post(endpoint, data);

            if(response?.data?.access_token) {
                login(response.data.access_token);
            }

        } catch(e) {
            toast.error('The email or the password may be wrong!');
        }
    }


    return (
        <form className="container-custom" onSubmit={handleSubmit}>
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <div className="image">
                        <MdOutlineEmail />
                    </div>
                    <input 
                        id="email"
                        type="email" 
                        name="email"
                        placeholder="Email"
                        required={true}
                    />
                </div>
                <div className="input">
                    <div className="image">
                        <MdOutlinePassword />
                    </div>
                    <input 
                        id="password"
                        type="password" 
                        name="password"
                        placeholder="Password"
                        required={true}
                    />
                </div>
            </div>
            <div className="forgot-password">Forgot your password? <span>Click here!</span></div>
            <div className="submit-container">
                <button className="submit" type="submit">Login</button>
            </div>
        </form>
    )

}

export default Login