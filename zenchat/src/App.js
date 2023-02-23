import './App.css';
import io from 'socket.io-client';
import {useEffect, useState } from "react";
import Chat from './components/Chat';

const socket = io.connect("http://localhost:3001");

function App() {
  // Initialize these two variables to use state. When values are inputted in the username or room fields, set a new state.
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  // A state to determine whether a user has chosen a room or not.
  const [joinedRoom, setJoinedRoom] = useState(false);

  // When Join a Room is clicked...
  const joinRoom = () => {
    // Ensure username and room are not blank
    if(username !== "" && room !== ""){
      // Emit a join_room
      socket.emit("join_room", room);
      // When joinedRoom becomes true, setShowChat = true
      setJoinedRoom(true);
    }
  };

  return (
    <div className="App">
    {!joinedRoom ? (
    <div className="joinChatContainer">
      <h1>Zenchat</h1>
      <h3>Messages go as easily as they come.</h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join a Room</button>
    </div>
  )
    :(
    <Chat socket={socket} username={username} room={room} />
    )}
    </div>
  );
}

export default App;
