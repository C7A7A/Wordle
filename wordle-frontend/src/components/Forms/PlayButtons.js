import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import apiRoutes from "../Common/APIRoutes";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useStateMachine } from "little-state-machine";

const PlayButtons = ({guestName, email, password, handleLogin}) => {
    const [connection, setConnection] = useState();
    if (connection) {
        console.log("connection is active");
    }

    const navigate = useNavigate(); 

    const generateRoomCode = async () => {
        try {
            const {data: response} = await axios.get(apiRoutes.wordle)
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    const startConnection = async (userName, room) => {
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

    const isDataValid = async () => {
        if (email && password) {
            const result = await handleLogin();
            console.log(result);
            return result;
        }

        if (guestName) {
            return true;
        }

        return false;
    }

    const handleJoinRoom = async () => {
        const dataValid = await isDataValid();
        if (!dataValid) {
            return;
        }
        navigate('/lobby');
    }

    const handlePlay = async () => {
        const dataValid = await isDataValid();
        if (!dataValid) {
            return;
        }

        generateRoomCode()
            .then(data => {
                const room = data;
                const userName = guestName ? guestName : email
                startConnection(userName, room)
                navigate(`/game/${room}`);
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="d-flex justify-content-end mt-2">
            <div className="m-1">
                <Button variant="standard" type="button" disabled={!guestName && (!email || !password)} onClick={handleJoinRoom}>
                    Join Room
                </Button>
            </div>
            <div className="m-1">
                <Button variant="standard" type="button" disabled={!guestName && (!email || !password)} onClick={handlePlay}>
                    Play
                </Button>
            </div>
        </div>
    )
}

export default PlayButtons;