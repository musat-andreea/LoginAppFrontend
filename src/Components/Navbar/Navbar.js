import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <>
           <nav> <div></div>
                <div>
                    <ul id="navbar">
                        <li>
                            <a href="/homepage">Home</a>
                        </li>
                        <li>
                            <a href="/signup">Sign Up</a>
                        </li>
                        <li>
                            <a href="/login">Login</a>
                        </li>
                    </ul>
                </div>
           </nav>
        </>
    );
};
 

export default Navbar;