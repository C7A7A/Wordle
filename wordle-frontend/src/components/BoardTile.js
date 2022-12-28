const BoardTile = ({rowNumber, colNumber}) => {
    return (
        <div className="p-2">
            <p> {rowNumber + " " + colNumber} </p>
        </div>
    )
}

export default BoardTile;