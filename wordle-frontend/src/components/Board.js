import BoardRow from "./BoardRow";
import { useState } from "react";

const Board = ({name, disabled}) => {
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