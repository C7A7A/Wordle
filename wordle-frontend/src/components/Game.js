import Board from "./Board"
import { useState } from "react";
import GameOverModal from "./GameOverModal";
import { Button } from "react-bootstrap";

const Game = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-between col-12">
                <div className="d-flex justify-content-center col-6">
                    <Board 
                        name={'Mateusz'}
                        disabled={false} 
                    />
                </div>
                <div className="d-flex justify-content-center col-6">
                    <Board 
                        name={'Oponent'} 
                        disabled={true}
                    />
                </div>
            </div>

            <Button variant="standard" type="button" onClick={() => setModalShow(true)}>
                Modal
            </Button>

            <GameOverModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                status={'won'}
                answer={'WORDLE'}
            />
        </div>
    )
}

export default Game;