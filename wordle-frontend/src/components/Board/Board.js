import { useStateMachine } from "little-state-machine";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardRow from "./BoardRow";

const Board = ({player, disabled}) => {
    const { state } = useStateMachine();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.currentUser.name) {
            // TODO: generate random name and let play by pasting url with room code?
            navigate('/');
        }
    }, [navigate, state.currentUser.name])

    useEffect(() => {
        let boardName = (player === 'current') ? state.currentUser.name : state.opponent.name
        setName(boardName)
    }, [state, player]);

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <div className='m-2'> {name} </div>
            <div className="d-flex justify-content-center flex-column">
                <BoardRow rowNumber={0} disabled={disabled} autoFocus={true} />
                <BoardRow rowNumber={1} disabled={disabled} />
                <BoardRow rowNumber={2} disabled={disabled} />
                <BoardRow rowNumber={3} disabled={disabled} />
                <BoardRow rowNumber={4} disabled={disabled} />
                <BoardRow rowNumber={5} disabled={disabled} />
            </div>
        </div>
    )
}

export default Board;