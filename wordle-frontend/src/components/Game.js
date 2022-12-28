import Board from "./Board"

const Game = () => {
    return (
        <div className="d-flex justify-content-between col-12">
            <div className="d-flex justify-content-center col-6">
                <Board name={'Mateusz'} />
            </div>
            <div className="d-flex justify-content-center col-6">
                <Board name={'Oponent'} />
            </div>
        </div>
    )
}

export default Game;