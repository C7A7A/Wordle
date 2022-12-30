import BoardTile from "./BoardTile";
import { Button, Form } from "react-bootstrap";

const BoardRow = ({rowNumber, disabled, autoFocus=false}) => {

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
            console.log(`submit form ${rowNumber}`)
        }}>
            <div className='d-flex'>
                <BoardTile row={rowNumber} position={0} disabled={disabled} autoFocus={autoFocus} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
                <BoardTile row={rowNumber} position={1} disabled={disabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
                <BoardTile row={rowNumber} position={2} disabled={disabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
                <BoardTile row={rowNumber} position={3} disabled={disabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious}/>
                <BoardTile row={rowNumber} position={4} disabled={disabled} moveToNext={moveToNext} moveToPrevious={moveToPrevious} />
            </div>

            <Button className='d-none' type='submit'></Button>
        </Form>
    )
}

export default BoardRow;