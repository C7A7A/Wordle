import { useStateMachine } from "little-state-machine";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardRow from "./BoardRow";

const Board = ({answerStatuses, player, attemptNumber, activePlayer}) => {
    const { state } = useStateMachine();
    const navigate = useNavigate();

    useEffect(() => {
        if (!player) {
            // TODO: generate random name and let play by pasting url with room code?
            navigate('/');
        }
    }, [navigate, player])

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <div className='m-2'> {player} </div>
            <div className="d-flex justify-content-center flex-column">
                {[...Array(6)].map((x, i) =>
                    <BoardRow 
                        key={i}
                        answerStatuses={answerStatuses[i]} 
                        currentUser={state.currentUser} 
                        rowNumber={i} 
                        isDisabled={activePlayer ? attemptNumber !== i : true} 
                        attemptNumber={attemptNumber} />
                )}
            </div>
        </div>
    )
}

export default Board;