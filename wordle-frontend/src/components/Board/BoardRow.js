import BoardTile from "./BoardTile";
import { Button, Form } from "react-bootstrap";
import { checkAnswer, lastAnswer } from "../Common/WordleHub";

const BoardRow = ({answerStatuses, currentUser, rowNumber, isDisabled, attemptNumber}) => {
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
            console.log(answer);
            if (attemptNumber !== 5) {
                checkAnswer(currentUser.connection, currentUser.name, currentUser.room, answer);
            } else {
                lastAnswer(currentUser.connection, currentUser.name, currentUser.room, answer);
            }
        }}>
            <div className='d-flex'>
                <BoardTile bgColor={answerStatuses[0]} row={rowNumber} position={0} disabled={isDisabled} autoFocus={isDisabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
                <BoardTile bgColor={answerStatuses[1]} row={rowNumber} position={1} disabled={isDisabled} autoFocus={isDisabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
                <BoardTile bgColor={answerStatuses[2]} row={rowNumber} position={2} disabled={isDisabled} autoFocus={isDisabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
                <BoardTile bgColor={answerStatuses[3]} row={rowNumber} position={3} disabled={isDisabled} autoFocus={isDisabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious}/>
                <BoardTile bgColor={answerStatuses[4]} row={rowNumber} position={4} disabled={isDisabled} autoFocus={isDisabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
            </div>

            <Button className='d-none' type='submit'></Button>
        </Form>
    )
}

export default BoardRow;