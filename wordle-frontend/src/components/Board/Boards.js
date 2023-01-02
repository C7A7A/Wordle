import { useStateMachine } from "little-state-machine";
import { useState, useEffect } from "react";
import Board from "./Board";
import { initWordleArray } from "../Common/InitializeState";
import { Button } from "react-bootstrap";
import GameOverModal from "./GameOverModal";

const Boards = () => {
    const { state } = useStateMachine();
    const [modalShow, setModalShow] = useState(false);
    const [answerStatuses, setAnswerStatuses] = useState(() => initWordleArray());
    const [attemptNumber, setAttempNumber] = useState(0);
    const [opponentAnswerStatuses, setOpponentAnswerResponse] = useState(() => initWordleArray());
    const [opponentAttemptNumber, setOpponentAttempNumber] = useState(0);

    useEffect(() => {
        if (state.answerResponse.length > 0) {
            var letterStatuses = state.answerResponse;
            var tileStyles = getTileStyles(letterStatuses);

            const tmpAnswerStatuses = [...answerStatuses];
            tmpAnswerStatuses[attemptNumber] = tileStyles;

            setAnswerStatuses(tmpAnswerStatuses);
            setAttempNumber((x) => (x + 1) % 6);
        }
    }, [state.answerResponse])

    useEffect(() => {
        if (state.opponentAnswerResponse.length > 0) {
            var letterStatuses = state.opponentAnswerResponse;
            var tileStyles = getTileStyles(letterStatuses);

            const tmpAnswerStatuses = [...opponentAnswerStatuses];
            tmpAnswerStatuses[opponentAttemptNumber] = tileStyles;

            setOpponentAnswerResponse(tmpAnswerStatuses);
            setOpponentAttempNumber((x) => (x + 1) % 6);
        }
    }, [state.opponentAnswerResponse])

    const getTileStyles = (letterStatuses) => {
        var tileStyles = [];
        for (let i = 0; i < letterStatuses.length; i++) {
            if (letterStatuses[i] === "CORRECT") {
                tileStyles[i] = "green-bg-color";
            } else if (letterStatuses[i] === "EXIST") {
                tileStyles[i] = "yellow-bg-color";
            } else if (letterStatuses[i] === "NOT EXIST") {
                tileStyles[i] = "hover-bg-color";
            } else {
                tileStyles[i] = "standard-bg-color";
            }
        }

        return tileStyles;
    }

    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-between col-12">
                <div className="d-flex justify-content-center col-6">
                    <Board
                        answerStatuses={answerStatuses}
                        player={state.currentUser.name}
                        disabled={false} 
                    />
                </div>
                <div className="d-flex justify-content-center col-6">
                    <Board 
                        answerStatuses={opponentAnswerStatuses}
                        player={state.opponent.name}
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

export default Boards;