import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
    const [name, setName] = useState("");
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
        if (name == "") {
            alert("enter your name");
        } else if (email == "") {
            alert("enter your email address");
        } else if (password == "") {
            alert("enter your password");
        } else {
            const user = {
                name: name,
                email_address: email,
                password: password,
            };
            const api_data = await fetch("http://localhost:5000/register", {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await api_data.json();
            if (data) {
                const userData = JSON.stringify(data.result);
                const token = JSON.stringify(data.auth);
                localStorage.setItem("user", userData);
                localStorage.setItem("token", token);
                alert("Registration Successful");
                navigate("/");
            } else {
                // ...
                alert("Registration Failed!");
            }
        }
    }

    return (
        <div className="ui">
            <div className='register'>
                <div className="in">
                    <h1>Register</h1>
                    <p>Create your new account</p>
                </div>
                <div className="content">
                    <input className='input'
                        placeholder='username'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <button className='button' onClick={collectData}>Sign up</button>
                </div>
                <div className="other">
                    <p>Already have an account? <Link className='link' to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
