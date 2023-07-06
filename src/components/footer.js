import React from 'react';
import { Link } from "react-router-dom";
import "../App.css";

const Footer = () => {
    return (
        <div className='footer'>
            <h3 className='copy'>Dashboard &#169; {new Date().getFullYear()}</h3>
        </div>
    );
}

export default Footer;