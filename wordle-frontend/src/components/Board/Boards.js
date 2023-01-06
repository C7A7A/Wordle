import { useStateMachine } from "little-state-machine";
import { useState, useEffect } from "react";
import Board from "./Board";
import { initWordleArray } from "../Common/InitializeState";
import GameOverModal from "./GameOverModal";
import { switchRematch } from "../State/StateMethods";

const Boards = () => {
    const { state, actions } = useStateMachine({switchRematch});
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

    useEffect(() => {
        if (state.currentUser.status !== "draw") {
            setModalShow(true);
        }
    }, [state.currentUser.status])

    useEffect(() => {
        if (state.rematch) {
            console.log('empty boards data');
            setAnswerStatuses(initWordleArray());
            setAttempNumber(0);
            setOpponentAnswerResponse(initWordleArray());
            setOpponentAttempNumber(0);
            actions.switchRematch();
            setModalShow(false);
        }
    }, [state.rematch, actions])

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
                        attemptNumber={attemptNumber}
                    />
                </div>
                <div className="d-flex justify-content-center col-6">
                    <Board 
                        answerStatuses={opponentAnswerStatuses}
                        player={state.opponent.name}
                        attemptNumber={attemptNumber}
                    />
                </div>
            </div>

            <GameOverModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default Boards;