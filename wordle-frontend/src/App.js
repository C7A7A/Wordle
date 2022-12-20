import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from "./components/Lobby";
import Chat from "./components/Chat";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';

const App = () => {
  const [userName, setUserName] = useState();
  const [room, setRoom] = useState();
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinRoom = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7190/room")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (userName, message) => {
        setMessages(messages => [...messages, {userName, message}])
      });

      await connection.start();
      await connection.invoke("JoinRoom", {userName, room});
      setConnection(connection);

    } catch (error) {
      console.log(error);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", {userName, room}, message);
    } catch (error) {
      console.log(error);
    }
  }

  return <div className='app'>
    {!connection 
    ? <Lobby joinRoom={joinRoom} setUserName={setUserName} setRoom={setRoom} />
    : <Chat messages={messages} sendMessage={sendMessage} />
    } 
  </div>
} 

export default App;
