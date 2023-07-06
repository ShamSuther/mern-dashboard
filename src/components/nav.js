import React, { useRef, useEffect } from 'react';
import { json, NavLink, useNavigate } from "react-router-dom";
import logo from '../logo.svg';
import "../App.css";

const Nav = () => {
    const auth = localStorage.getItem("user");
    const user = JSON.parse(auth);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/register")
    }
    return (
        <div className='NavUI'>
            <div className='logo'>
                <img src={logo} alt="logo" />
            </div>
            <div className='nav_content'>
                <ul className='nav_list'>
                    {auth ?
                        <>
                            <li>
                                <NavLink className='link' to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink className='link' to="/add">Add</NavLink>
                            </li>
                            <li>
                                <NavLink className='link' onClick={logout} to="/register">Logout</NavLink>
                            </li>
                        </>
                        :
                        <li>
                            <NavLink className='link' to="/register">Register</NavLink>
                        </li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default Nav;
