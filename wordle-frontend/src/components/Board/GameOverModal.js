import { useStateMachine } from "little-state-machine";
import { Modal, Button} from "react-bootstrap";
import { switchRematch } from "../State/StateMethods";
import { playAgain } from "../Common/WordleHub";

const GameOverModal = ({show, onHide}) => {
    const { state } = useStateMachine();

    const handlePlayAgain = () => {
        playAgain(state.currentUser.connection, state.currentUser.name, state.currentUser.room);
        onHide();        
    }

    const handleClose = () => {
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <div className='dark-bg-color'>
                <Modal.Header className='d-flex justify-content-center'>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        You {state.currentUser.status}!
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className='d-flex justify-content-center align-items-center p-4'>
                    <span> The answer was: {state.wordleAnswer} </span>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='standard' onClick={handleClose}>
                        Close
                    </Button>                 
                    <Button variant='standard' onClick={handlePlayAgain}>
                        Play again
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default GameOverModal;