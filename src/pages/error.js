import React from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="ui error">
            <h1>404 | page not found</h1>
        </div>
    )
}

export default Error;
