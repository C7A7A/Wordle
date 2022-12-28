import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PlayButtons = ({guestName, email, password}) => {
    const navigate = useNavigate(); 

    const handleJoinRoom = () => {
        console.log("Join room");
        navigate('/lobby');
    }

    const handlePlay = () => {
        console.log("Play");
        navigate('/game/test');
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