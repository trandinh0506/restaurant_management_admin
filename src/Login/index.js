import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../Notification";
import { SERVERHOST } from "../domain";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                SERVERHOST + "/auth/login",
                { username, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            )
            .then(() => {
                navigate("/dashboard");
            })
            .catch((err) => {
                const response = err.response;
                setMessage(
                    `Status: ${response.status} - Message: ${response.data}`
                );
            });
        setUsername("");
        setPassword("");
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage("");
        }, 2500);
        return () => {
            clearTimeout(timer);
        };
    }, [message]);
    return (
        <div className="login-container">
            {message && <Notification message={message} />}
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="true"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="true"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
