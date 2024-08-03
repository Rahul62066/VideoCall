import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [room, setRoom] = useState("");
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate(`/room/${room}`);
    };
    return (
        <div>
            <label>Room No: <input value={room} onChange={(e) => setRoom(e.target.value)} placeholder='room no..' type="text" /></label>
            <button onClick={handleSubmit}>Join</button>
        </div>
    )
}

export default Home