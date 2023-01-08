import BoardTile from "./BoardTile";
import { Button, Form } from "react-bootstrap";
import { checkAnswer, lastAnswer } from "../Common/WordleHub";
import { useState } from "react";

const BoardRow = ({answerStatuses, currentUser, rowNumber, isDisabled, attemptNumber}) => {
    const [focusTile, setFocusTile] = useState('');

    const moveToNext = (position) => {
        const nextField = document.querySelector(
            `input[name=tile-${rowNumber}-${position + 1}]`
        );

        if (nextField !== null) {
            nextField.focus();
        }
    }

    const moveToPrevious = (position) => {
        const previousField = document.querySelector(
            `input[name=tile-${rowNumber}-${position - 1}]`
        );

        if (previousField !== null) {
            previousField.focus();
        }
    }

    return (
        <Form onSubmit={e => {
            e.preventDefault();
            var answer = '';
            for (let i = 0; i < 5; i++) {
                answer += e.target[i].value;
            }

            if (answer.includes(" ")) {
                return;
            }

            // console.log(answer);
            if (attemptNumber !== 5) {
                checkAnswer(currentUser.connection, currentUser.name, currentUser.room, answer);
            } else {
                lastAnswer(currentUser.connection, currentUser.name, currentUser.room, answer);
            }
        }}>
            <div className='d-flex'>
                {[...Array(5)].map((x, i) =>
                    <BoardTile
                        key={i}
                        bgColor={isDisabled ? answerStatuses[i] : "dark-bg-color"} 
                        row={rowNumber} 
                        position={i} 
                        disabled={isDisabled}
                        focusTile={focusTile}
                        moveToNext={moveToNext} 
                        moveToPrevious={moveToPrevious} />
                )}
            </div>

            <Button className='d-none' type='submit'></Button>
        </Form>
    )
}

export default BoardRow;