import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import "./Login.css";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic 
        try {
            const response = await axios.post("/login", {
                email,
                password,
            });

            // Store token and role
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            // Navigate based on role
            if (response.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/home");
            }

        } catch (error) {
            alert("Login failed. Check your credentials.");
            console.error(error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <img src="/login_page_bus_image.jpg" alt="Bus Logo" className="login-image" />
            </div>
            <div className="login-right">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/Signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
