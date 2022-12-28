import BoardTile from "./BoardTile";

const BoardRow = ({rowNumber}) => {
    return (
        <div className='d-flex'>
            <BoardTile rowNumber={rowNumber} colNumber={1} />
            <BoardTile rowNumber={rowNumber} colNumber={2} />
            <BoardTile rowNumber={rowNumber} colNumber={3} />
            <BoardTile rowNumber={rowNumber} colNumber={4} />
            <BoardTile rowNumber={rowNumber} colNumber={5} />
        </div>
    )
}

export default BoardRow;