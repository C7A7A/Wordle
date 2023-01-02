import Boards from "./Boards";
import WaitingForOpponent from "./WaitingForOpponent";

const GameStatus = ({currentPlayer, opponent, room}) => {

    if (opponent !== "Opponent" && currentPlayer) {
        return <Boards />
    } 

    return <WaitingForOpponent room={room}/>
}

export default GameStatus;