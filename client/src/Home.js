import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        axios.get("/buses").then(response => {
            setBuses(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Bus Search</h1>
            <div>
                {buses.map(bus => (
                    <div key={bus.id}>
                        <h2>{bus.name}</h2>
                        <p>{bus.route}</p>
                        <button>Book Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
