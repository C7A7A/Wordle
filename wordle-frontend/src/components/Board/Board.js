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

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <div className='m-2'> {player} </div>
            <div className="d-flex justify-content-center flex-column">
                <BoardRow answerStatuses={answerStatuses[0]} currentUser={state.currentUser} rowNumber={0} isDisabled={attemptNumber !== 0} attemptNumber={attemptNumber} />
                <BoardRow answerStatuses={answerStatuses[1]} currentUser={state.currentUser} rowNumber={1} isDisabled={attemptNumber !== 1} attemptNumber={attemptNumber} />
                <BoardRow answerStatuses={answerStatuses[2]} currentUser={state.currentUser} rowNumber={2} isDisabled={attemptNumber !== 2} attemptNumber={attemptNumber} />
                <BoardRow answerStatuses={answerStatuses[3]} currentUser={state.currentUser} rowNumber={3} isDisabled={attemptNumber !== 3} attemptNumber={attemptNumber} />
                <BoardRow answerStatuses={answerStatuses[4]} currentUser={state.currentUser} rowNumber={4} isDisabled={attemptNumber !== 4} attemptNumber={attemptNumber} />
                <BoardRow answerStatuses={answerStatuses[5]} currentUser={state.currentUser} rowNumber={5} isDisabled={attemptNumber !== 5} attemptNumber={attemptNumber} />
            </div>
        </div>
    )
}

export default Board;