import LobbyTest from "./LobbyTest"
import ChatTest from "./ChatTest"
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';

const Game = () => {
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

  return <div className='game'>
    {!connection 
    ? <Lobby joinRoom={joinRoom} setUserName={setUserName} setRoom={setRoom} />
    : <Chat messages={messages} sendMessage={sendMessage} />
    } 
  </div>
} 

export default GameTest;
