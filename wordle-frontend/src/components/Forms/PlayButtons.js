import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiRoutes from "../Common/APIRoutes";
import { useStateMachine } from "little-state-machine";
import { switchRematch, updateUserStatus, setAnswerWordle, updateUserName, updateOpponentName, updateUserConnection, updateUserRoom, setAnswerResponse, setOpponentAnswerResponse } from "../State/StateMethods";
import { startConnection } from "../Common/WordleHub";
import { useState, useEffect } from "react";

const PlayButtons = ({guestName, email, password, handleLogin}) => {
    const {state, actions} = useStateMachine({ switchRematch, updateUserStatus, setAnswerWordle, updateUserName, updateOpponentName, updateUserConnection, updateUserRoom, setAnswerResponse, setOpponentAnswerResponse });
    const navigate = useNavigate(); 
    const [room, setRoom] = useState('');

    useEffect(() => {
        if (room && state.currentUser.name) {
            console.log("currentuser:", state.currentUser)
            startConnection(state.currentUser.name, room, actions);
            navigate(`/game/${room}`);
        }
       
    }, [room, actions, state.currentUser.name])

    const generateRoomCode = async () => {
        try {
            const {data: response} = await axios.get(apiRoutes.wordle)
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    const isDataValid = async () => {
        if (email && password) {
            return await handleLogin();
        }

        if (guestName) {
            actions.updateUserName({name: guestName});
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
            .then(roomCode => {
                setRoom(roomCode);
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
                <Button className="w-100 h-100" variant="standard" type="button" disabled={!guestName && (!email || !password)} onClick={handlePlay}>
                    Play
                </Button>
            </div>
        </div>
    )
}

export default PlayButtons;