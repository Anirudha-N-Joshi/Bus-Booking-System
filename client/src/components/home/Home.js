import React, { useState, useEffect } from "react";
import axios from "axios"; // Directly import axios from the 'axios' package
import "./Home.css";

function Home() {
    const [buses, setBuses] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Fetch buses from the backend
        axios.get("http://localhost:5000/api/buses") // Replace with your backend URL
            .then((response) => setBuses(response.data));
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredBuses = buses.filter(bus =>
        bus.name.toLowerCase().includes(search.toLowerCase()) ||
        bus.route.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="home-container">
            <h1 className="home-title">Bus Reservation</h1>
            <input
                type="text"
                placeholder="Search buses or routes..."
                className="search-bar"
                value={search}
                onChange={handleSearchChange}
            />
            <div className="bus-list">
                {filteredBuses.map((bus) => (
                    <div key={bus.id} className="bus-card">
                        <h2 className="bus-name">{bus.name}</h2>
                        <p className="bus-route">{bus.route}</p>
                        <button className="book-button">Book Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
