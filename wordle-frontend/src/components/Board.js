import BoardRow from "./BoardRow";
import BoardTile from "./BoardTile";

const Board = ({name}) => {
    return (
        <div className="d-flex justify-content-center flex-column">
            <div> Board - {name} </div>
            <div className="d-flex justify-content-center flex-column">
                <BoardRow rowNumber={1} />
                <BoardRow rowNumber={2} />
                <BoardRow rowNumber={3} />
                <BoardRow rowNumber={4} />
                <BoardRow rowNumber={5} />
                <BoardRow rowNumber={6} />
            </div>
        </div>
    )
}

export default Board;