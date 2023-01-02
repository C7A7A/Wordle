import BoardTile from "./BoardTile";
import { Button, Form } from "react-bootstrap";
import { checkAnswer } from "../Common/WordleHub";

const BoardRow = ({answerStatuses, currentUser, rowNumber, disabled, autoFocus=false}) => {

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
            checkAnswer(currentUser.connection, currentUser.name, currentUser.room, answer);
        }}>
            <div className='d-flex'>
                <BoardTile bgColor={answerStatuses[0]} row={rowNumber} position={0} disabled={disabled} autoFocus={autoFocus} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
                <BoardTile bgColor={answerStatuses[1]} row={rowNumber} position={1} disabled={disabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
                <BoardTile bgColor={answerStatuses[2]} row={rowNumber} position={2} disabled={disabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
                <BoardTile bgColor={answerStatuses[3]} row={rowNumber} position={3} disabled={disabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious}/>
                <BoardTile bgColor={answerStatuses[4]} row={rowNumber} position={4} disabled={disabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
            </div>

            <Button className='d-none' type='submit'></Button>
        </Form>
    )
}

export default BoardRow;