import { Modal, Button} from "react-bootstrap";

const GameOverModal = ({show, onHide, status, answer}) => {
    const handlePlayAgain = () => {
        console.log('Play again')
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
                        You {status}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className='d-flex justify-content-center align-items-center p-4'>
                    <span> The answer was: {answer} </span>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='standard' onClick={onHide}>
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