import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Cookies from 'js-cookie';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const access_token = Cookies.get('jwt_authorization');

        if(access_token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    return (
        <>
           <nav> <div></div>
                <div>
                    <ul id="navbar">
                        <li>
                            <a href="/homepage">Home</a>
                        </li>
                        <li>
                            { isLoggedIn === false && <a href="/signup">Sign Up</a>}
                        </li>
                        <li>
                            { isLoggedIn === false ?
                                <a href="/login">Login</a> :
                                <a href="/logout">Logout</a>
                            }
                        </li>
                    </ul>
                </div>
           </nav>
        </>
    );
};
 

export default Navbar;