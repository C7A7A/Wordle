import { useStateMachine } from "little-state-machine";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardRow from "./BoardRow";

const Board = ({answerStatuses, player, attemptNumber}) => {
    const { state } = useStateMachine();
    const navigate = useNavigate();

    useEffect(() => {
        if (!player) {
            // TODO: generate random name and let play by pasting url with room code?
            navigate('/');
        }
    }, [navigate, player])

    const renderRows = () => {
        return 
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <div className='m-2'> {player} </div>
            <div className="d-flex justify-content-center flex-column">
                {[...Array(6)].map((x, i) =>
                    <BoardRow 
                        answerStatuses={answerStatuses[i]} 
                        currentUser={state.currentUser} 
                        rowNumber={i} 
                        isDisabled={attemptNumber !== i} 
                        attemptNumber={attemptNumber} />
                )}
            </div>
        </div>
    )
}

export default Board;