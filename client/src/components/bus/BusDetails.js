import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BusDetails.css"; // CSS for Bus Details page

function BusDetails() {
    const { busId } = useParams();
    const [bus, setBus] = useState(null);

    useEffect(() => {
        axios.get(`/buses/${busId}`).then((response) => setBus(response.data));
    }, [busId]);

    return (
        <div className="bus-details-container">
            {bus ? (
                <>
                    <h1 className="bus-details-title">{bus.name}</h1>
                    <p className="bus-details-route">{bus.route}</p>
                    <p className="bus-details-seats">Seats Available: {bus.seats}</p>
                    <p className="bus-details-price">Price: ₹{bus.price}</p>
                    <button className="book-now-button">Book Now</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default BusDetails;
