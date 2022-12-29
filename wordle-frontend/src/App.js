import './App.scss';
import { useState, useEffect } from "react";
import axios from 'axios';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import AuthenticatePlayer from './components/AuthenicatePlayer';
import apiRoutes from './components/APIRoutes';

const App = () => {
    const [room, setRoom] = useState();
    const [userName, setUserName] = useState("Mateusz");
    const [connection, setConnection] = useState();
    
    const generateRoomCode = async () => {
        await axios.get(apiRoutes.wordle)
        .then((response) => {
            setRoom(response.data)
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        
    }, []);

    const startGame = async () => {
        try {
            const connection = new HubConnectionBuilder()
            .withUrl(apiRoutes.startConnection)
            .configureLogging(LogLevel.Information)
            .build();
    
            connection.on("StartGame", (userName, message) => {
                console.log(userName, message);
            });

            connection.on("JoinRoom", (userName, message) => {
                console.log(userName, message);
            });

            connection.on("GameOver", (userName, message) => {
                console.log(userName, message)
            });
    
            await connection.start();
            await connection.invoke("StartGame", {userName, room});
            setConnection(connection);

        } catch (error) {
            console.error(error);
        }
    }

    const joinRoom = async () => {
        try {
            const connection = new HubConnectionBuilder()
            .withUrl(apiRoutes.startConnection)
            .configureLogging(LogLevel.Information)
            .build();

            connection.on("JoinRoom", (userName, message) => {
                console.log(userName, message);
            });
    
            await connection.start();
            await connection.invoke("JoinRoom", {userName, room});
            setConnection(connection);

        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
            <AuthenticatePlayer />
        </div>
    )
}

export default App;
