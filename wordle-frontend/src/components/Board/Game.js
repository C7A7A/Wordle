import { useStateMachine } from "little-state-machine";
import GameStatus from "./GameStatus";
import { useEffect, useState } from "react";
import { switchRematch, updateUserStatus, setAnswerWordle, updateUserName, updateUserConnection, updateUserRoom, updateOpponentName, setAnswerResponse, setOpponentAnswerResponse } from "../State/StateMethods";
import { generateGuestName } from "../Common/InitializeState";
import { useLocation } from "react-router-dom";
import { joinRoom } from "../Common/WordleHub";

const Game = () => {
    const {state, actions} = useStateMachine({switchRematch, updateUserStatus, setAnswerWordle, updateUserName, updateOpponentName, updateUserConnection, updateUserRoom, setAnswerResponse, setOpponentAnswerResponse});
    const [roomCode, setRoomCode] = useState('');
    const location = useLocation();

    useEffect(() => {
        const room = location.pathname.split('/')[2]
        setRoomCode(room)

        if (!state.currentUser.name && state.opponent.name === "Opponent") {
            console.log("GENERATING")
            const guestName = generateGuestName(5)
            actions.updateUserName({name: guestName});
            
            console.log("JOINING ROOM")
            console.log(guestName, room);
            joinRoom(guestName, room, actions);
        }   
    
    }, [location.pathname, roomCode, state.currentUser.name, state.opponent.name])
    
    return(
        <GameStatus currentPlayer={state.currentUser.name} opponent={state.opponent.name} room={roomCode} />
    )
}

export default Game;