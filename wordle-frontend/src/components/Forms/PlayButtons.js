import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiRoutes from "../Common/APIRoutes";
import { useStateMachine } from "little-state-machine";
import { updateUserName, updateOpponentName } from "../State/StateMethods";
import { startConnection } from "../Common/WordleHub";

const PlayButtons = ({guestName, email, password, handleLogin}) => {
    const {state, actions} = useStateMachine({ updateUserName, updateOpponentName });
    const navigate = useNavigate(); 

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
            const result = await handleLogin();
            return result;
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
                const userName = guestName ? guestName : email
                startConnection(userName, roomCode, state, actions)
                navigate(`/game/${roomCode}`);
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