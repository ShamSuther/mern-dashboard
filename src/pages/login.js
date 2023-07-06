import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    })

    const collectData = async () => {
        if (email == "") {
            alert("enter your email address");
        } else if (password == "") {
            alert("enter your password");
        } else {
            const user = {
                email_address: email,
                password: password,
            };
            const api_data = await fetch("http://localhost:5000/login",
                {
                    method: "post",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const result = await api_data.json();
            if (result.auth) {
                const userData = JSON.stringify(result.user_data);
                const token = JSON.stringify(result.auth);
                localStorage.setItem("user", userData);
                localStorage.setItem("token", token);
                alert("Login Successful");
                navigate("/");
            } else {
                // ...
                alert(result.message);
            }
        }
    }

    return (
        <div className="ui">
            <div className='register'>
                <div className="in">
                    <h1>Login</h1>
                    <p>Sign in to your account</p>
                </div>
                <div className="content">
                    <input className='input'
                        placeholder='email address'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input className='input'
                        placeholder='password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="submit">
                    <button className='button' onClick={collectData}>Login</button>
                </div>
                <div className="other">
                    <p>Don't have an account? <Link className='link' to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
