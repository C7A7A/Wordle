import { Form, InputGroup } from "react-bootstrap";
import { useState } from "react";

const BoardTile = ({bgColor, row, position, disabled, autoFocus=false, moveToNext, moveToPrevious}) => {
    const [letter, setLetter] = useState('');

    const handleOnChange = (e) => {
        let text = e.target.value
        if (text.length > 0) {
            setLetter(text[0].toUpperCase())
            moveToNext(position)
        } else {
            moveToPrevious(position)
            setLetter('')
        }
    }

    return (
        <>
            <InputGroup className='m-1'>
                <Form.Control
                    name={`tile-${row}-${position}`}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    className={`d-flex board-tile ${bgColor} text-extra-large white-color text-center`} 
                    onChange={handleOnChange} 
                    value={letter}
                />
            </InputGroup>
        </>
    )
}

export default BoardTile;