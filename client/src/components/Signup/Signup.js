import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/signup", {
                ...formData,
                role: "user",
            });
            alert("Signup successful!");
            navigate("/login");
        } catch (error) {
            alert("Signup failed. Try again.");
            console.error(error);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-left">
                <img src="/login_page_bus_image.jpg" alt="bus" />
            </div>
            <div className="signup-right">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup} className="signup-form">
                    <div className="name-fields">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name *"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name *"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone No *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password *"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Sign-Up</button>
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
