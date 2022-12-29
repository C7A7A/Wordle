import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import apiRoutes from "../Common/APIRoutes";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const PlayButtons = ({guestName, email, password}) => {
    const [connection, setConnection] = useState();
    console.log('connection: ', connection);

    const navigate = useNavigate(); 

    const generateRoomCode = async () => {
        try {
            const {data: response} = await axios.get(apiRoutes.wordle)
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    // const joinRoom = async () => {
    //     try {
    //         const connection = new HubConnectionBuilder()
    //         .withUrl(apiRoutes.startConnection)
    //         .configureLogging(LogLevel.Information)
    //         .build();

    //         connection.on("JoinRoom", (userName, message) => {
    //             console.log(userName, message);
    //         });
    
    //         await connection.start();
    //         await connection.invoke("JoinRoom", {userName, room});
    //         setConnection(connection);

    //     } catch(error) {
    //         console.error(error);
    //     }
    // }

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

    const handleJoinRoom = () => {
        navigate('/lobby');
    }

    const handlePlay = () => {
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