import React, { useEffect, useState } from 'react';
import './Signup.css';
import { BsPersonVcard } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import Cookies from "js-cookie";
import axios from "axios";
import {getApiConfig} from "../../helpers";
import {toast} from "react-toastify";

const Signup = () => {

    useEffect(() => {
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name: event.target.userName.value,
            location: event.target.location.value,
            email: event.target.email.value,
            password: event.target.password.value,
            repeatPassword: event.target.repeatPassword.value,
        }

        if (event.target.password.value !== event.target.repeatPassword.value) {
            toast.error('The passwords do not match');
            return;
        }

        const endpoint = `${getApiConfig().apiBaseUrl}/auth/signup`;

        try {
            const response = await axios.post(endpoint, data);

            if(response.data.success === true) {
                toast.success('User created');
                setTimeout(window.location.href = '/login', 2000);
            }

        } catch(e) {
            if (e?.response?.data?.message == 'User already exists') {
                toast.error('Already exist an account with this email address.');
                return;
            } else {
                toast.error('Please try again!');
            }
        }
    }

    return (
        <form className="container-custom" onSubmit={handleSubmit}>
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <div className="image">
                        <BsPersonVcard />
                    </div> 
                    <input 
                        id="userName"
                        type="text" 
                        name="userName"
                        placeholder="Name"
                    />
                </div>

                <div className="input">
                    <div className="image">
                        <FaMapLocationDot />
                    </div> 
                    <input 
                        id="location"
                        type="text" 
                        name="location"
                        placeholder="Location"
                    />
                </div>
                
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

                <div className="input">
                    <div className="image">
                        <MdOutlinePassword />
                    </div>
                    <input 
                        id="repeatPassword"
                        type="password" 
                        name="repeatPassword"
                        placeholder="Repeat Password"
                        required={true}
                    />
                </div>
            </div>
            <div className="submit-container">
                <button className="submit" type="submit">Sign Up</button>
            </div>
        </form>
    )

}

export default Signup