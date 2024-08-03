import React, { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../context/SocketProviders'
import { useNavigate } from 'react-router-dom';

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  
  const navigate = useNavigate()
  const socket = useSocket();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (socket) {
      console.log({
        email: email,
        room: room,
      });

      socket.emit("room:join", { email, room });
    }
  }, [email, room, socket]);

  const handleJoinRoom = useCallback((data) => {
const {email, room } = data;
 navigate(`/room/${room}`);
  },[navigate]);

  useEffect(()=>{
    socket.on("room:join",handleJoinRoom)
      return () => {
        socket.off("room:join",handleJoinRoom);

      }
      
  },[socket,handleJoinRoom])

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Email'
            type="email"
            required
          />
        </label>
        <br />
        <label>
          Room No:
          <input
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            placeholder='Room no..'
            type="text"
            required
          />
        </label>
        <br />
        <button type='submit'>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
