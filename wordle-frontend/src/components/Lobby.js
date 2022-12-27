import { useState, useEffect } from "react";
import axios from 'axios';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Form, Button } from "react-bootstrap";

const wordleURL = "https://localhost:7190/api/v1/Wordle"
const wordleHubURL = "https://localhost:7190/room";

const Lobby = () => {
    const [room, setRoom] = useState();
    const [userName, setUserName] = useState("Mateusz");
    const [connection, setConnection] = useState();
    
    const generateRoomCode = async () => {
        await axios.get(wordleURL)
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
            .withUrl(wordleHubURL)
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
            .withUrl(wordleHubURL)
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
        <>
            <h1>Lobby</h1>
            <p> room code: {room} </p>

            <Form 
                className='lobby'
                onSubmit = {e => {
                    e.preventDefault();
                    startGame();
                }}
            >
                <Form.Group>
                    <Form.Control placeholder='name' value={userName} onChange={e => setUserName(e.target.value)} />
                    <Form.Control value={room || ''} onChange={e => setRoom(e.target.value)} />
                    <Button variant="primary" type="button" onClick={generateRoomCode}> Generate room code </Button>
                </Form.Group>

                <Button variant="success" type="submit" disabled={!room || !userName}> Start Game </Button>
            </Form>

            <Form 
                className='lobbyJoin'
                onSubmit = {e => {
                    e.preventDefault();
                    joinRoom();
                }}
            >
                <Button variant="success" type="submit" disabled={!room || !userName}> Join Game </Button>
            </Form>
        </>
    )
}

export default Lobby;