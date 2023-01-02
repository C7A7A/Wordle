import { Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";

const WaitingForOpponent = ({room}) => {
    const [showToast, setShowToast] = useState(false);
    const [currentURL, setCurrentURL] = useState('');

    useEffect(() => {
      setCurrentURL(window.location.href);
    }, [])
    

    const copyToClipboard = async (stringToCopy) => {
        try {
            await navigator.clipboard.writeText(stringToCopy);
            toggleShowToast();
        } catch (error) {
            console.error(error);            
        }
    }

    const toggleShowToast = () => setShowToast(!showToast);

    return (
        <div className="d-flex h-100 justify-content-center">
            <Toast 
                onClose={() => setShowToast(false)} 
                show={showToast} 
                delay={2000} 
                autohide
                className="white-color hover-bg-color position-absolute text-center start-0 end-0 top-5 m-auto"
            >
                <Toast.Body>
                    <h5> Text was sucessfully copied to clipboard! </h5>
                </Toast.Body>
            </Toast>

            <div className="d-flex justify-content-center flex-column">
                <h1> Waiting for opponent... </h1>

                <div className="text-center p-4 mb-3">
                    <Spinner className="waiting-opponent-spinner" animation="border" role="status">
                        <span className="visually-hidden"> Loading... </span>
                    </Spinner>
                </div>

                <Button variant="standard" type="button" className="m-1" onClick={() => {copyToClipboard(room)}}>
                    Copy room code
                </Button>
                <Button variant="standard" type="button" className="m-1" onClick={() => {copyToClipboard(currentURL)}}>
                    Copy link
                </Button>
            </div>
        </div>
    )
}

export default WaitingForOpponent;
