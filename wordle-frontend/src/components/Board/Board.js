import { useStateMachine } from "little-state-machine";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardRow from "./BoardRow";

const Board = ({answerStatuses, player, disabled}) => {
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
                <BoardRow answerStatuses={answerStatuses[0]} currentUser={state.currentUser} rowNumber={0} disabled={disabled} autoFocus={true} />
                <BoardRow answerStatuses={answerStatuses[1]} currentUser={state.currentUser} rowNumber={1} disabled={disabled} />
                <BoardRow answerStatuses={answerStatuses[2]} currentUser={state.currentUser} rowNumber={2} disabled={disabled} />
                <BoardRow answerStatuses={answerStatuses[3]} currentUser={state.currentUser} rowNumber={3} disabled={disabled} />
                <BoardRow answerStatuses={answerStatuses[4]} currentUser={state.currentUser} rowNumber={4} disabled={disabled} />
                <BoardRow answerStatuses={answerStatuses[5]} currentUser={state.currentUser} rowNumber={5} disabled={disabled} />
            </div>
        </div>
    )
}

export default Board;